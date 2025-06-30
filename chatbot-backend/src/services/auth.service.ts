import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '../models/User';
import PasswordResetToken from '../models/PasswordResetToken';
import { generateTokens } from '../utils/jwt';
import { sendPasswordResetEmail, sendVerificationEmail } from './email.service';

const SALT_ROUNDS = 10;

export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email já cadastrado');
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const emailVerificationToken = crypto.randomBytes(20).toString('hex');
  const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas
  
  const user = new User({ 
    firstName, 
    lastName, 
    email, 
    password: hashedPassword,
    emailVerificationToken,
    emailVerificationExpires
  });
  
  await user.save();
  await sendVerificationEmail(email, emailVerificationToken);
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Credenciais inválidas');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Credenciais inválidas');

  return {
    ...generateTokens(user._id.toString()),
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }
  };
};

export const requestPasswordReset = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Usuário não encontrado');

  // Gera token único (usando uuidv4)
  const resetToken = Math.random().toString(36).slice(2);
  const expiresAt = new Date(Date.now() + 3600000); // 1 hora

  await PasswordResetToken.create({
    userId: user._id,
    token: resetToken,
    expiresAt
  });

  await sendPasswordResetEmail(user.email, resetToken);
};

export const resetPassword = async (token: string, newPassword: string) => {
  const resetToken = await PasswordResetToken.findOne({ token })
    .populate('userId')
    .exec();

  if (!resetToken || resetToken.expiresAt < new Date()) {
    throw new Error('Token inválido ou expirado');
  }

  const user = resetToken.userId as any;
  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
  
  user.password = hashedPassword;
  await user.save();
  
  await PasswordResetToken.deleteMany({ userId: user._id });
};