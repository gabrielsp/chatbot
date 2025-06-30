import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.stack);
  
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  const error = new Error(`🔍 - Não encontrado - ${req.originalUrl}`);
  next(error);
};

export const notFoundHandler = (req: Request, res: Response) => {
  logger.error(`Endpoint não encontrado: ${req.method} ${req.path}`);
  
  res.status(404).json({
    success: false,
    error: {
      message: 'Endpoint não encontrado',
      path: req.path,
      method: req.method,
      possibleCauses: [
        'Rota mal configurada',
        'Prefixo duplicado na URL',
        'Método HTTP incorreto'
      ],
      suggestedFix: 'Verifique a documentação da API'
    }
  });
};