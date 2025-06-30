import { Request, Response, NextFunction } from 'express';
import logger from './logger';
import mongoose from 'mongoose';

interface AppError extends Error {
  statusCode?: number;
  code?: number;
  errors?: any[];
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log do erro
  logger.error(`[${req.method}] ${req.path} >> `, err);
  
  let statusCode = err.statusCode || 500;
  let message = 'Erro interno do servidor';
  let details: any = null;
  
  // Tratamento para erros do Mongoose
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = 'Erro de validação';
    details = Object.values(err.errors).map(e => e.message);
  } 
  else if (err.name === 'MongoServerError' && err.code === 11000) {
    statusCode = 409;
    message = 'Conflito de dados';
    
    // Extrair campo duplicado
    const match = err.message.match(/index: (\w+)_/);
    if (match) {
      details = { field: match[1], message: `${match[1]} já está em uso` };
    }
  }
  // Erros de autenticação
  else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Token inválido';
  }
  else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expirado';
  }
  // Erros personalizados
  else if (err.statusCode && typeof err.statusCode === 'number') {
    statusCode = err.statusCode;
    message = err.message || message;
  }
  
  // Resposta formatada
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(details && { details }),
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      message: 'Endpoint não encontrado',
      path: req.path,
      method: req.method
    }
  });
};

export const asyncHandler = (fn: Function) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };