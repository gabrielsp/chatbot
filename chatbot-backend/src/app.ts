import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config/env';
import router from './routes';
import { connectDB } from './config/db';
import { authLimiter } from './middlewares/rateLimiter';
import passport from './config/passport'; 
import { notFoundHandler, errorHandler } from './middlewares/error.middleware';
import listEndpoints from 'express-list-endpoints';

dotenv.config();
const app = express();

// Middleware CORS restaurado
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key', 'Accept'],
  credentials: true
}));

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(passport.initialize());

// Conectar ao banco de dados
connectDB();

// Rate Limiter para rotas de autenticação
app.use('/api/auth', authLimiter);

// Rotas
app.use('/api', router);

// Middleware de erro
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  
  // Listar rotas
  console.table(listEndpoints(app).map(({ path, methods }) => ({
    Path: path,
    Métodos: methods.join(", "),
  })));
});