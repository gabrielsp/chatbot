import { Request, Response } from 'express';
import User from '../models/User';
import ChatbotConfig from '../models/ChatbotConfig';
import bcrypt from 'bcryptjs';
import ChatMessage from '../models/ChatMessage';
import mongoose from 'mongoose';

export const getProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    const user = await User.findById((req.user as any)._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    const { firstName, lastName } = req.body;
    const user = await User.findByIdAndUpdate(
      (req.user as any)._id,
      { firstName, lastName },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
};

// Função para atualizar dados pessoais
export const updatePersonalData = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    
    const userId = (req.user as any)._id;
    const { cpf, cep, street, number, complement, city, state } = req.body;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { cpf, cep, street, number, complement, city, state },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar dados pessoais' });
  }
};

// Função para trocar senha
export const changePassword = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    
    const userId = (req.user as any)._id;
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Senha atual incorreta' });
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    
    res.json({ message: 'Senha atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar senha' });
  }
};

// estatísticas do dashboard
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    
    const generateMockData = () => {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      
      
      const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
      }).reverse();

      
      const messagesByDay = dates.map(date => ({
        _id: date,
        count: Math.floor(Math.random() * 30) + 10
      }));

      
      const satisfactionData = dates.map(() => 
        parseFloat((Math.random() * 3 + 2).toFixed(1)) // Valores entre 2.0 e 5.0
      );

      return {
        totalMessages: Math.floor(Math.random() * 100) + 50,
        resolutionRate: Math.floor(Math.random() * 40) + 60, // 60-100%
        satisfactionRate: parseFloat((Math.random() * 100 + 2).toFixed(1)), // 2.0-5.0
        activeChats: Math.floor(Math.random() * 15) + 5,
        avgResponseTime: `${Math.floor(Math.random() * 2000) + 500}ms`, // 500-2500ms
        messagesData: messagesByDay.map(day => day.count),
        satisfactionData,
        dates 
      };
    };

    
    const useMockData = process.env.NODE_ENV === 'development'; // Ou usar uma flag
    let stats;

    if (useMockData) {
      stats = generateMockData();
    } else {
    
      const userId = (req.user as any)._id;
      
      // 1. Total de mensagens hoje
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      
      const totalMessages = await ChatMessage.countDocuments({
        userId,
        timestamp: { $gte: startOfDay, $lte: endOfDay }
      });

      // 2. Taxa de resolução
      const resolvedMessages = await ChatMessage.countDocuments({
        userId,
        timestamp: { $gte: startOfDay, $lte: endOfDay },
        resolved: true
      });
      
      const resolutionRate = totalMessages > 0 
        ? Math.round((resolvedMessages / totalMessages) * 100)
        : 0;

      // 3. Taxa de satisfação (últimos 7 dias)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const satisfactionData = await ChatMessage.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            timestamp: { $gte: sevenDaysAgo },
            satisfaction: { $exists: true, $gt: 0 }
          }
        },
        {
          $group: {
            _id: { $dayOfYear: "$timestamp" },
            avgSatisfaction: { $avg: "$satisfaction" }
          }
        },
        { $sort: { "_id": 1 } }
      ]);
      
      // 4. Chats ativos (últimas 24 horas)
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      
      const activeChats = await ChatMessage.distinct('sessionId', {
        userId,
        timestamp: { $gte: twentyFourHoursAgo }
      });
      
      // 5. Tempo médio de resposta
      const responseTimeStats = await ChatMessage.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            responseTime: { $gt: 0 }
          }
        },
        {
          $group: {
            _id: null,
            avgResponseTime: { $avg: "$responseTime" }
          }
        }
      ]);
      
      const avgResponseTime = responseTimeStats.length > 0 
        ? `${Math.round(responseTimeStats[0].avgResponseTime)}ms`
        : '0ms';
      
      // 6. Dados para gráficos
      const messagesByDay = await ChatMessage.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            timestamp: { $gte: sevenDaysAgo }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
            count: { $sum: 1 }
          }
        },
        { $sort: { "_id": 1 } }
      ]);
      
      // Formatar dados para resposta
      const stats = {
        totalMessages,
        resolutionRate,
        satisfactionRate: satisfactionData.length > 0
          ? Math.round(satisfactionData.reduce((sum, day) => sum + day.avgSatisfaction, 0) / satisfactionData.length)
          : 0,
        activeChats: activeChats.length,
        avgResponseTime,
        messagesData: messagesByDay.map(day => day.count),
        satisfactionData: satisfactionData.map(day => Math.round(day.avgSatisfaction))
      };
    }
    res.json(stats);
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas do dashboard' });
  }
};