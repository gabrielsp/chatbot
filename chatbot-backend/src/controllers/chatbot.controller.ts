import { Request, Response } from 'express';
import ChatbotConfig from '../models/ChatbotConfig';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import { Readable } from 'stream';
import validator from 'validator';
import { generatePassword } from '../utils/auth';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import { sendWelcomeEmail } from '../services/email.service';
import Document from '../models/Document';
import * as xlsx from 'xlsx';

interface RequestWithFile extends Request {
  file?: any;
}

export const getChatbotConfig = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any)._id;
    const config = await ChatbotConfig.findOne({ userId });
    
    if (!config) {
      return res.status(404).json({ error: 'Configuração não encontrada' });
    }
    
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar configurações' });
  }
};

export const updateChatbotConfig = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as any)._id;
    const { phone, companyName, welcomeMessage } = req.body;
    
    let config = await ChatbotConfig.findOne({ userId });
    
    if (!config) {
      config = new ChatbotConfig({ userId, phone, companyName, welcomeMessage });
    } else {
      config.phone = phone;
      config.companyName = companyName;
      config.welcomeMessage = welcomeMessage;
    }
    
    await config.save();
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar configurações' });
  }
};

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }
    
    const userId = (req.user as any)._id;
    const file = req.file;
    
    let textContent = '';
    
    // Extrair texto baseado no tipo de arquivo
    if (file.mimetype === 'application/pdf') {
      const data = await pdf(file.buffer);
      textContent = data.text;
    } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      textContent = result.value;
    } else if (file.mimetype === 'text/plain') {
      textContent = file.buffer.toString('utf8');
    } else if (file.mimetype === 'text/html') {
      textContent = file.buffer.toString('utf8');
    } else if (
      file.mimetype === 'application/vnd.ms-excel' || 
      file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      const workbook = xlsx.read(file.buffer, { type: 'buffer' });
      textContent = workbook.SheetNames.map(name => {
        const worksheet = workbook.Sheets[name];
        return xlsx.utils.sheet_to_csv(worksheet);
      }).join('\n\n');
    } else {
      return res.status(400).json({ error: 'Tipo de arquivo não suportado' });
    }
    
    // Armazenar o texto extraído no documento de configuração do chatbot
    // Obter configuração do chatbot para companyId
    const config = await ChatbotConfig.findOne({ userId });
    if (!config) {
      return res.status(404).json({ error: 'Configuração do chatbot não encontrada' });
    }

    // Salvar no novo modelo Document
    const newDoc = new Document({
      userId,
      filename: file.originalname,
      content: textContent,
      companyId: config._id
    });

    await newDoc.save();
    
    res.json({ 
      message: 'Arquivo processado e conteúdo salvo com sucesso',
      documentId: newDoc._id
    });
  } catch (error) {
    console.error('Erro ao processar arquivo:', error);
    res.status(500).json({ error: 'Erro ao processar arquivo' });
  }
};

export const getConfigForPython = async (req: Request, res: Response) => {
  try {

    const apiKey = req.headers['x-api-key'] as string;
    
    if (apiKey !== process.env.PYTHON_API_KEY) {
      return res.status(401).json({ error: 'Não autorizado' });
    }

    const configs = await ChatbotConfig.find().populate('userId', 'email');
    console.log('Configurações encontradas:', configs.length);
    
    const response = configs.map(c => {
      const config = c as { _id: any; phone: any; companyName: string; welcomeMessage: string; userId: any };
      return {
        _id: config._id.toString(),
        phone: config.phone.toString(),
        companyName: config.companyName,
        welcomeMessage: config.welcomeMessage,
        userId: config.userId.toString()
      };
    });

    console.log('Resposta enviada:', response);
    res.json(response);
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    res.status(500).json({ error: 'Erro ao buscar configurações' });
  }
};

export const addPlatformUser = async (req: Request, res: Response) => {
  try {
    const { userType, fullName, cpf, birthDate, email } = req.body;
    
    // Validações
    if (!['colaborador', 'atendente', 'professor'].includes(userType)) {
      return res.status(400).json({ error: 'Tipo de usuário inválido' });
    }
    
    if (!fullName || fullName.trim().split(' ').length < 2) {
      return res.status(400).json({ error: 'Nome completo é obrigatório' });
    }
    
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }
    
    if (!validator.isDate(birthDate)) {
      return res.status(400).json({ error: 'Data de nascimento inválida' });
    }
    
    const birthDateObj = new Date(birthDate);
    const age = new Date().getFullYear() - birthDateObj.getFullYear();
    if (age < 18) {
      return res.status(400).json({ error: 'Usuário deve ser maior de 18 anos' });
    }
    
    // Verificar se CPF é válido (exemplo básico)
    const cleanCpf = cpf.replace(/\D/g, '');
    if (cleanCpf.length !== 11) {
      return res.status(400).json({ error: 'CPF inválido' });
    }
    
    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ $or: [{ email }, { cpf: cleanCpf }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Email ou CPF já cadastrado' });
    }
    
    // Criar novo usuário
    const [firstName, ...lastNameParts] = fullName.split(' ');
    const lastName = lastNameParts.join(' ');
    
    // Gerar senha temporária
    const tempPassword = generatePassword(12);
    
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(tempPassword, 10),
      cpf: cleanCpf,
      birthDate: birthDateObj,
      role: userType,
      emailVerified: false
    });
    
    await newUser.save();
    
    // Enviar e-mail com instruções
    await sendWelcomeEmail(email, fullName, tempPassword);
    
    res.json({ 
      message: 'Usuário adicionado com sucesso',
      userId: newUser._id,
      tempPassword // Desenvolvimento, em produção não enviar
    });
  } catch (error: any) {
    console.error('Erro ao adicionar usuário:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({ error: 'Erro de validação', details: errors });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email ou CPF já cadastrado' });
    }
    
    res.status(500).json({ error: 'Erro ao adicionar usuário' });
  }
};