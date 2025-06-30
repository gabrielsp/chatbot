import { Router, RequestHandler, Request, Response, NextFunction } from 'express';
import { 
  register, 
  login, 
  forgotPassword, 
  resetPassword,
  refreshToken,
  verifyEmail
} from '../controllers/auth.controller';
import passport from 'passport';
import { generateTokens } from '../utils/jwt';
import { body, validationResult } from 'express-validator';

const router = Router();

// Rota de registro com validação
router.post('/register', [
  body('firstName').notEmpty().isLength({ min: 2 }),
  body('lastName').notEmpty().isLength({ min: 2 }),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 })
], (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  register(req, res).catch(next);
});

router.post('/login', login as RequestHandler);
router.post('/forgot-password', forgotPassword as RequestHandler);
router.post('/reset-password', resetPassword as RequestHandler);
router.get('/verify-email/:token', verifyEmail as RequestHandler); // Corrigido
router.post('/refresh-token', refreshToken as RequestHandler);

// Rotas de autenticação Google
router.get('/google', (req, res, next) => {
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })(req, res, next);
});

router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  (req, res) => {
    if (!req.user) {
      return res.redirect('/login?error=authentication_failed');
    }
    const user = req.user as any;
    const { accessToken } = generateTokens(user._id.toString());
    res.redirect(`http://localhost:5173/auth-callback?token=${accessToken}`);
  }
);

// Rotas de autenticação Apple
router.get('/apple', passport.authenticate('apple', { scope: ['profile', 'email'] }));
router.get('/apple/callback', 
  passport.authenticate('apple', { session: false }),
  (req, res) => {
    if (!req.user) {
      return res.redirect('/login?error=authentication_failed');
    }
    const user = req.user as any;
    const { accessToken } = generateTokens(user._id.toString());
    res.redirect(`http://localhost:5173/auth-callback?token=${accessToken}`);
  }
);

// Rotas de autenticação Facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['profile', 'email'] }));
router.get('/facebook/callback', 
  passport.authenticate('facebook', { session: false }),
  (req, res) => {
    if (!req.user) {
      return res.redirect('/login?error=authentication_failed');
    }
    const user = req.user as any;
    const { accessToken } = generateTokens(user._id.toString());
    res.redirect(`http://localhost:5173/auth-callback?token=${accessToken}`);
  }
);

export default router;