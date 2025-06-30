import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: parseInt(process.env.PORT || '5000'),
  NODE_ENV: process.env.NODE_ENV || 'development',
  CHATBOT_API_URL: process.env.CHATBOT_API_URL || 'http://localhost:5001',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/chatbot',
  BASE_URL: process.env.BASE_URL || 'http://localhost:5000',
  PYTHON_API_KEY: process.env.PYTHON_API_KEY || 'seu_segredo_aqui',
  JWT_SECRET: process.env.JWT_SECRET || 'super_secret_key',
  JWT_ACCESS_EXPIRATION: '15m',
  JWT_REFRESH_EXPIRATION: '7d',
  
  // Social Auth
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || '',
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || '',
  APPLE_CLIENT_ID: process.env.APPLE_CLIENT_ID || '',
  APPLE_TEAM_ID: process.env.APPLE_TEAM_ID || '',
  APPLE_KEY_ID: process.env.APPLE_KEY_ID || '',
  APPLE_PRIVATE_KEY: process.env.APPLE_PRIVATE_KEY || '',
  
  // Email
  EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.example.com',
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT || '587'),
  EMAIL_USER: process.env.EMAIL_USER || 'user@example.com',
  EMAIL_PASS: process.env.EMAIL_PASS || 'password',
  EMAIL_FROM: process.env.EMAIL_FROM || 'noreply@chatbot.com',
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000, // 15 minutos
  RATE_LIMIT_MAX: 100, // 100 requisições por janela
};