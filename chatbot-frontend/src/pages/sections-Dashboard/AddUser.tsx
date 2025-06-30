import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import api from '../../services/api';
import { FiUser, FiFileText } from 'react-icons/fi';
import GlassCard from '../../components/ui/GlassCard';

type PlatformUser = {
  userType: string;
  fullName: string;
  cpf: string;
  birthDate: string;
  email: string;
  confirmEmail: string;
};

const AddUser: React.FC = () => {
  const [userData, setUserData] = useState<PlatformUser>({
    userType: 'colaborador',
    fullName: '',
    cpf: '',
    birthDate: '',
    email: '',
    confirmEmail: ''
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let { name, value } = e.target;
    
    if (name === 'fullName') {
      // Somente letras e espaços
      value = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
    } else if (name === 'cpf') {
      // Somente números e limita a 11 dígitos
      value = value.replace(/\D/g, '').slice(0, 11);
    } else if (name === 'email' || name === 'confirmEmail') {
      // Remove espaços
      value = value.trim();
    }
    
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    if (userData.email !== userData.confirmEmail) {
      setError('Os e-mails não coincidem');
      setSaving(false);
      return;
    }

    try {
      await api.post('/chatbot/users', userData);
      setSuccess('Usuário adicionado com sucesso!');
      setUserData({
        userType: 'colaborador',
        fullName: '',
        cpf: '',
        birthDate: '',
        email: '',
        confirmEmail: ''
      });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao adicionar usuário');
    } finally {
      setSaving(false);
    }
  };

  return (
    <GlassCard className="p-6">
      <form onSubmit={handleSubmit} className="max-w-3xl">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>}
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">{success}</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Tipo de Usuário</label>
            <div className="relative">
              <select
                name="userType"
                value={userData.userType}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-gradient-to-r from-white/80 to-white/90 dark:from-gray-800/90 dark:to-gray-800/80"
              >
                <option value="colaborador">Colaborador</option>
                <option value="atendente">Atendente</option>
                <option value="professor">Professor</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Nome Completo</label>
            <div className="relative">
              <input
                type="text"
                name="fullName"
                value={userData.fullName}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-r from-white/80 to-white/90 dark:from-gray-800/90 dark:to-gray-800/80"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">CPF</label>
            <div className="relative">
              <input
                type="text"
                name="cpf"
                value={userData.cpf}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-r from-white/80 to-white/90 dark:from-gray-800/90 dark:to-gray-800/80"
                placeholder="12345678900"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFileText className="text-gray-400" />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Data de Nascimento</label>
            <div className="relative">
              <input
                type="date"
                name="birthDate"
                value={userData.birthDate}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-r from-white/80 to-white/90 dark:from-gray-800/90 dark:to-gray-800/80"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">E-mail</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-r from-white/80 to-white/90 dark:from-gray-800/90 dark:to-gray-800/80"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Confirmar E-mail</label>
            <div className="relative">
              <input
                type="email"
                name="confirmEmail"
                value={userData.confirmEmail}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-r from-white/80 to-white/90 dark:from-gray-800/90 dark:to-gray-800/80"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
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
                Adicionando...
              </>
            ) : 'Adicionar Usuário'}
          </button>
        </div>
      </form>
    </GlassCard>
  );
};

export default AddUser;