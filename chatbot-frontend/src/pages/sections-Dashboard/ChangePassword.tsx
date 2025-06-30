import React, { useState } from 'react';
import type { FormEvent } from 'react';
import api from '../../services/api';
import { FiLock } from 'react-icons/fi';
import GlassCard from '../../components/ui/GlassCard';

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    
    if (newPassword.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres');
      return;
    }

    // Verificar complexidade da senha
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumbers = /\d/.test(newPassword);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    if (!(hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars)) {
      setError('A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais');
      return;
    }
    
    setSaving(true);
    setError('');
    setSuccess('');
    
    try {
      await api.put('/users/password', {
        currentPassword,
        newPassword
      });
      setSuccess('Senha alterada com sucesso!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao alterar a senha');
    } finally {
      setSaving(false);
    }
  };

  return (
    <GlassCard className="p-6">
      <form onSubmit={handleSubmit} className="max-w-lg">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>}
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">{success}</div>}
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Senha Atual</label>
          <div className="relative">
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-r from-white/80 to-white/90 dark:from-gray-800/90 dark:to-gray-800/80"
              required
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Nova Senha</label>
          <div className="relative">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-r from-white/80 to-white/90 dark:from-gray-800/90 dark:to-gray-800/80"
              required
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="text-gray-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.
          </p>
        </div>
        
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Confirmar Nova Senha</label>
          <div className="relative">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-r from-white/80 to-white/90 dark:from-gray-800/90 dark:to-gray-800/80"
              required
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLock className="text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button 
            type="submit"
            disabled={saving}
            className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 py-2 rounded-lg font-medium flex items-center transition-colors disabled:opacity-50"
          >
            {saving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Atualizando...
              </>
            ) : 'Atualizar Senha'}
          </button>
        </div>
      </form>
    </GlassCard>
  );
};

export default ChangePassword;