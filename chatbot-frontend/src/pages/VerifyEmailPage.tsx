import React, { useEffect, useState } from 'react'; // Adicione useState
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import { confirmEmail } from '../services/authApi';
import { useAuth } from '../contexts/AuthContext';

const VerifyEmailPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuthState } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        
        if (!token) {
          setError('Token de verificação não encontrado');
          setIsLoading(false);
          return;
        }
        
        const response = await confirmEmail(token);
        
        // Salva o token e atualiza o estado de autenticação
        localStorage.setItem('token', (response.data as any).token);
        setAuthState({
          isAuthenticated: true,
          user: (response.data as any).user
        });
        
        setIsConfirmed(true);
        
        // Redireciona após 3 segundos
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
        
      } catch (err: any) {
        setError(err.response?.data?.error || 'Falha ao verificar email');
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [location.search, setAuthState, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <GlassCard className="w-full max-w-md p-8 rounded-2xl z-10 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-6"></div>
          <p className="text-gray-700">Verificando seu email...</p>
        </GlassCard>
      </div>
    );
  }

  if (isConfirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <GlassCard className="w-full max-w-md p-8 rounded-2xl z-10">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Email Verificado!</h2>
            <p className="text-gray-600 mt-4">
              Seu endereço de email foi confirmado com sucesso.
            </p>
            <p className="text-gray-600 mt-2">
              Você já pode acessar sua conta e começar a usar nossos serviços.
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link 
              to="/dashboard" 
              className="inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:from-green-500 hover:to-blue-600 transition-all duration-300"
            >
              Ir para o Dashboard
            </Link>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <GlassCard className="w-full max-w-md p-8 rounded-2xl z-10">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Verifique seu Email</h2>
          <p className="text-gray-600 mt-4">
            Enviamos um link de verificação para seu email.
          </p>
          <p className="text-gray-600 mt-2">
            Por favor, verifique sua caixa de entrada e clique no link para confirmar seu endereço de email.
          </p>
          
          {error && (
            <div className="mt-4 text-red-500">
              {error}
            </div>
          )}
        </div>

        <div className="text-center text-sm text-gray-600 mt-6">
          Não recebeu o email? 
          <button className="text-blue-600 font-medium hover:underline ml-1">
            Reenviar
          </button>
        </div>

        <div className="mt-8 text-center">
          <Link 
            to="/login" 
            className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
          >
            Voltar para Login
          </Link>
        </div>
      </GlassCard>
    </div>
  );
};

export default VerifyEmailPage;