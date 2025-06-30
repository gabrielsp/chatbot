import { Router, RequestHandler } from 'express';
import { 
    getProfile, 
    updateProfile,
    updatePersonalData,
    changePassword,
    getDashboardStats
} from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Aplica autenticação a todas as rotas de usuário
router.use(authenticate as RequestHandler);

router.get('/profile', getProfile as RequestHandler);
router.put('/profile', updateProfile as RequestHandler);
router.put('/personal-data', updatePersonalData as RequestHandler);
router.put('/password', changePassword as RequestHandler);
router.get('/stats', getDashboardStats as RequestHandler);

export default router;