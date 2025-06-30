import rateLimit from 'express-rate-limit';
import config from '../config/env';

export const authLimiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX,
  message: 'Muitas tentativas, tente novamente mais tarde',
  skipSuccessfulRequests: true,
});