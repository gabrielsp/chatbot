import nodemailer from 'nodemailer';
import config from '../config/env';
import logger from '../utils/logger';


// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS,
  },
})

export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    
    await transporter.sendMail({
      from: `"Chatbot Support" <${config.EMAIL_FROM}>`,
      to: email,
      subject: 'Verifique seu email',
      html: `<p>Por favor clique no link para verificar seu email: <a href="${verificationUrl}">${verificationUrl}</a></p>`,
    });
    
    logger.info(`Email de verificação enviado para ${email}`);
  } catch (error) {
    logger.error(`Erro ao enviar email de verificação: ${error}`);
    throw new Error('Falha ao enviar email de verificação');
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  try {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    
    await transporter.sendMail({
      from: `"Chatbot Support" <${config.EMAIL_FROM}>`,
      to: email,
      subject: 'Recuperação de senha',
      html: `<p>Para redefinir sua senha, clique no link: <a href="${resetUrl}">${resetUrl}</a></p>`,
    });
    
    logger.info(`Email de recuperação enviado para ${email}`);
  } catch (error) {
    logger.error(`Erro ao enviar email de recuperação: ${error}`);
    throw new Error('Falha ao enviar email de recuperação');
  }
};

export const sendWelcomeEmail = async (email: string, fullName: string, tempPassword: string) => {
  try {
    await transporter.sendMail({
      from: `"Chatbot Support" <${config.EMAIL_FROM}>`,
      to: email,
      subject: 'Bem-vindo à plataforma!',
      html: `
        <p>Olá, <strong>${fullName}</strong>!</p>
        <p>Seu cadastro foi realizado com sucesso.</p>
        <p>Sua senha temporária é: <strong>${tempPassword}</strong></p>
        <p>Por favor, acesse a plataforma e altere sua senha assim que possível.</p>
        <p>Se precisar de ajuda, entre em contato com o suporte.</p>
        <br>
        <p>Atenciosamente,<br>Equipe Chatbot</p>
      `,
    });

    logger.info(`Email de boas-vindas enviado para ${email}`);
  } catch (error) {
    logger.error(`Erro ao enviar email de boas-vindas: ${error}`);
    throw new Error('Falha ao enviar email de boas-vindas');
  }
};