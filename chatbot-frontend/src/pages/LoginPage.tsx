import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import { login, register, socialLogin } from '../services/authApi';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupConfirmEmail, setSignupConfirmEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [error, setError] = useState('');
  //const [loading, setLoading] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthState } = useAuth();
  const { authState } = useAuth();

  if (authState.isAuthenticated) {
    navigate('/dashboard');
    return;
  }

  // Trata o redirecionamento de login social com token
  useEffect(() => {
    
    if (authState.isAuthenticated) {
      navigate('/dashboard');
    }

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      
      // Fetch user profile (you'll need to implement this endpoint in your backend)
      const fetchUserProfile = async () => {
        try {
          // For now, we'll just set a dummy user
          setAuthState({
            isAuthenticated: true,
            user: {
              id: 'social-user-id',
              firstName: 'Social',
              lastName: 'User',
              email: 'social@example.com',
              role: 'user'
            }
          });
          navigate('/dashboard');
        } catch (err) {
          setError('Falha ao carregar perfil do usuário');
        }
      };
      
      fetchUserProfile();
    }
  }, [authState.isAuthenticated, location, navigate, setAuthState]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoginLoading(true);
    
    try {
      const response = await login(loginEmail, loginPassword);
    
      localStorage.setItem('token', (response.data as any).accessToken);
      
      setAuthState({ user: (response.data as any).user, isAuthenticated: true });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Falha no login');
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (signupPassword !== signupConfirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    
    if (signupEmail !== signupConfirmEmail) {
      setError('Os emails não coincidem');
      return;
    }
    
    setIsSignupLoading(true);
    
    try {
      await register(signupFirstName, signupLastName, signupEmail, signupPassword);
      
      // Redirect to email verification page
      navigate('/verify-email', { state: { email: signupEmail } });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Falha no cadastro');
    } finally {
      setIsSignupLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    socialLogin(provider);
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-24 p-4 relative overflow-hidden">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 z-10">
        {/* Login Card */}
        <GlassCard className="w-full p-6 rounded-2xl">
          <div className="text-center mb-6">
            <div className="mx-auto w-14 h-14 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Acesse sua conta</h2>
            <p className="text-gray-600 mt-1 text-sm">Use suas credenciais para entrar</p>
          </div>

          {error && (
            <div className="mb-4 text-red-500 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="mb-4">
            <div className="mb-3">
              <label htmlFor="loginEmail" className="block text-gray-700 mb-1 text-sm">Email</label>
              <input
                type="email"
                id="loginEmail"
                className="w-full px-3 py-2 text-sm bg-white/50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="seu@email.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="loginPassword" className="block text-gray-700 mb-1 text-sm">Senha</label>
              <input
                type="password"
                id="loginPassword"
                className="w-full px-3 py-2 text-sm bg-white/50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <div className="text-right mt-1">
                <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">Esqueceu a senha?</Link>
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={isLoginLoading}
              className={`w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 rounded-lg font-medium text-sm shadow-md hover:from-green-500 hover:to-blue-600 transition-all duration-300 mb-4 ${isLoginLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoginLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
          
          <div className="flex items-center justify-center mb-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="mx-3 text-gray-600 text-xs px-2 py-1">ou continue com</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          
          <div className="grid grid-cols-3 gap-3 mb-4">
            <button 
              type="button" 
              className="social-login-btn bg-white/50 border border-gray-300 rounded-lg py-2 flex items-center justify-center hover:bg-gray-100 transition"
              onClick={() => handleSocialLogin('google')}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </button>
            <button 
              type="button" 
              className="social-login-btn bg-white/50 border border-gray-300 rounded-lg py-2 flex items-center justify-center hover:bg-gray-100 transition"
              onClick={() => handleSocialLogin('facebook')}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
              </svg>
            </button>
            <button 
              type="button" 
              className="social-login-btn bg-white/50 border border-gray-300 rounded-lg py-2 flex items-center justify-center hover:bg-gray-100 transition"
              onClick={() => handleSocialLogin('apple')}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="#000000"/>
              </svg>
            </button>
          </div>
        </GlassCard>

        {/* Signup Card */}
        <GlassCard className="w-full p-6 rounded-2xl">
          <div className="text-center mb-6">
            <div className="mx-auto w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Criar Nova Conta</h2>
            <p className="text-gray-600 mt-1 text-sm">Preencha os campos abaixo para se registrar</p>
          </div>

          {error && (
            <div className="mb-4 text-red-500 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup}>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label htmlFor="firstName" className="block text-gray-700 mb-1 text-sm">Nome</label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-3 py-2 text-sm bg-white/50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Seu nome"
                  value={signupFirstName}
                  onChange={(e) => setSignupFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-gray-700 mb-1 text-sm">Sobrenome</label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-3 py-2 text-sm bg-white/50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Seu sobrenome"
                  value={signupLastName}
                  onChange={(e) => setSignupLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="mb-3">
              <label htmlFor="signupEmail" className="block text-gray-700 mb-1 text-sm">Email</label>
              <input
                type="email"
                id="signupEmail"
                className="w-full px-3 py-2 text-sm bg-white/50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="seu@email.com"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="confirmEmail" className="block text-gray-700 mb-1 text-sm">Confirmar Email</label>
              <input
                type="email"
                id="confirmEmail"
                className="w-full px-3 py-2 text-sm bg-white/50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="confirme@seu.email"
                value={signupConfirmEmail}
                onChange={(e) => setSignupConfirmEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="signupPassword" className="block text-gray-700 mb-1 text-sm">Senha</label>
              <input
                type="password"
                id="signupPassword"
                className="w-full px-3 py-2 text-sm bg-white/50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="••••••••"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700 mb-1 text-sm">Confirmar Senha</label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-3 py-2 text-sm bg-white/50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="••••••••"
                value={signupConfirmPassword}
                onChange={(e) => setSignupConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-xs text-gray-700">
                Concordo com os <a href="#" className="text-purple-600 hover:underline">Termos</a> e <a href="#" className="text-purple-600 hover:underline">Política</a>
              </label>
            </div>
            
            <button 
              type="submit"
              disabled={isSignupLoading}
              className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-medium text-sm shadow-md hover:from-purple-600 hover:to-pink-600 transition-all duration-300 ${isSignupLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSignupLoading ? 'Criando conta...' : 'Criar Conta'}
            </button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default LoginPage;