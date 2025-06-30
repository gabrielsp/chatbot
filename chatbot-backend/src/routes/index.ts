import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import chatbotRoutes from './chatbot.routes';
import { notFoundHandler, errorHandler } from '../middlewares/error.middleware';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes); // Remova o authenticate daqui

// Apenas para rotas específicas do chatbot que precisam de autenticação JWT
router.use('/chatbot', chatbotRoutes);

// Middlewares de erro
router.use(notFoundHandler);
router.use(errorHandler);

export default router;