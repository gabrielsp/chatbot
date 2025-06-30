import jwt, { SignOptions } from 'jsonwebtoken';
import config from '../config/env';
import { IUser } from '../models/User';

// Função para converter string de tempo em segundos
const parseExpiration = (timeString: string): number | string => {
  if (typeof timeString === 'number') return timeString;
  
  const unit = timeString.slice(-1);
  const value = parseInt(timeString.slice(0, -1), 10);
  
  switch (unit) {
    case 's': return value; // segundos
    case 'm': return value * 60; // minutos para segundos
    case 'h': return value * 3600; // horas para segundos
    case 'd': return value * 86400; // dias para segundos
    default: return timeString; // mantém como string se não reconhecer
  }
};

export const generateTokens = (userId: string) => {
  const accessExpires = parseExpiration(config.JWT_ACCESS_EXPIRATION);
  const refreshExpires = parseExpiration(config.JWT_REFRESH_EXPIRATION);
  
  const accessToken = jwt.sign(
    { userId },
    config.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId },
    config.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};
