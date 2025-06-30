import api from './api';

export const login = (email: string, password: string) => {
  return api.post('/auth/login', { email, password });
};

export const register = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  return api.post('/auth/register', { firstName, lastName, email, password });
};

export const forgotPassword = (email: string) => {
  return api.post('/auth/forgot-password', { email });
};

export const socialLogin = (provider: string) => {
  // Redireciona para o backend para iniciar o fluxo OAuth
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  window.location.href = `${baseUrl}/auth/${provider}`;
};

export const confirmEmail = (token: string) => {
  return api.get(`/auth/verify-email?token=${token}`);
};