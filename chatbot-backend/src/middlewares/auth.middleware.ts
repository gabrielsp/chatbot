import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/env';
import User from '../models/User';
import { IUser } from '../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const apiKeyAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log('\n======= HEADERS RECEBIDOS =======');
  console.log('Todos os headers:', req.headers);
  
  const apiKey = req.headers['x-api-key'] as string;
  console.log('API Key recebida:', apiKey?.substring(0, 4) + '...');
  console.log('API Key esperada:', process.env.PYTHON_API_KEY?.substring(0, 4) + '...');
  
  if (!apiKey) {
    console.log('API Key não encontrada nos headers');
    return res.status(401).json({ error: 'Token não fornecido ou mal formatado' });
  }
  
  if (apiKey !== process.env.PYTHON_API_KEY) {
    console.log('API Key não coincide');
    return res.status(401).json({ error: 'Chave API inválida' });
  }
  
  next();
};

export async function authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token não fornecido ou mal formatado' });
    return;
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      res.status(401).json({ error: 'Usuário não encontrado' });
      return;
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Erro na autenticação:', error);
    res.status(401).json({ error: 'Token inválido' });
  }
}

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any;
    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ error: 'Acesso não autorizado' });
      return;
    }
    next();
  };
};