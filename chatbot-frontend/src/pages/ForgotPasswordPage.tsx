import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import { forgotPassword } from '../services/authApi';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Falha ao enviar email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">

      <GlassCard className="w-full max-w-md p-8 rounded-2xl z-10">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Recuperar Senha</h2>
          <p className="text-gray-600 mt-2">
            {isSubmitted 
              ? "Verifique seu e-mail para redefinir sua senha" 
              : "Digite seu e-mail para receber as instruções de recuperação"}
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 text-red-500 text-center">{error}</div>
            )}
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-white/50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-medium shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 mb-6 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Enviando...' : 'Enviar Instruções'}
            </button>
            
            <div className="text-center text-sm text-gray-600">
              Lembrou sua senha?{' '}
              <Link to="/login" className="text-blue-600 font-medium hover:underline">
                Fazer login
              </Link>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <div className="bg-green-100 text-green-700 py-3 px-4 rounded-lg mb-6">
              Um e-mail com instruções foi enviado para <strong>{email}</strong>
            </div>
            <Link 
              to="/login" 
              className="inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:from-green-500 hover:to-blue-600 transition-all duration-300"
            >
              Voltar para Login
            </Link>
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default ForgotPasswordPage;