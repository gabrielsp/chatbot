import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as authService from '../services/auth.service';
import { generateTokens } from '../utils/jwt';
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await authService.registerUser(firstName, lastName, email, password);
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    await authService.requestPasswordReset(email);
    res.json({ message: 'Email de recuperação enviado' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    await authService.resetPassword(token, newPassword);
    res.json({ message: 'Senha redefinida com sucesso' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token é obrigatório' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as { userId: string };
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );

    res.json({ accessToken });
  } catch (error) {
    res.status(401).json({ error: 'Refresh token inválido' });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    
    const user = await User.findOne({ 
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Token inválido ou expirado' });
    }

    // Marcar e-mail como verificado
    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    // Gerar token de acesso
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );

    res.json({
      token: accessToken,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao verificar e-mail' });
  }
};