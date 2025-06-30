import { Router, RequestHandler } from 'express';
import multer from 'multer';
import { 
  getChatbotConfig,
  updateChatbotConfig,
  uploadFile,
  addPlatformUser,
  getConfigForPython
} from '../controllers/chatbot.controller';
import { authenticate, apiKeyAuth } from '../middlewares/auth.middleware';
import { sendToChatbot } from '../services/chatbot.service';
import { IUser } from '../models/User';

const router = Router();
const upload = multer();

// Rota pública - usa apenas apiKeyAuth
router.get('/config-for-python', apiKeyAuth as any, getConfigForPython as RequestHandler);

// Middleware de autenticação JWT aplicado apenas às rotas abaixo
router.use(authenticate as RequestHandler);

// Rotas protegidas por JWT
router.get('/config', getChatbotConfig as RequestHandler);
router.put('/config', updateChatbotConfig as RequestHandler);
router.post('/upload', upload.single('file'), uploadFile as RequestHandler);
router.post('/users', addPlatformUser as RequestHandler);
router.post('/message', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await sendToChatbot(message, (req.user as IUser)?._id.toString());
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Erro no chatbot' });
  }
});

export default router;