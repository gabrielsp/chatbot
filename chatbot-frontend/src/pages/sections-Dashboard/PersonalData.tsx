import React, { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import { FiUser, FiFileText, FiHome } from 'react-icons/fi';
import GlassCard from '../../components/ui/GlassCard';

type PersonalData = {
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
};

const PersonalData: React.FC = () => {
  const { authState } = useAuth();
  const [formData, setFormData] = useState<PersonalData>({
    firstName: authState.user?.firstName || '',
    lastName: authState.user?.lastName || '',
    email: authState.user?.email || '',
    cpf: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    city: '',
    state: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/users/profile');
        setFormData(response.data as PersonalData);
      } catch (err) {
        setError('Erro ao carregar dados pessoais');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Filtro para CPF: somente números e limita a 11 dígitos
  const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 11);
    setFormData(prev => ({ ...prev, cpf: value }));
  };

  // Filtro para CEP: somente números e limita a 8 dígitos
  const handleCepChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8);
    setFormData(prev => ({ ...prev, cep: value }));
  };

  // Buscar endereço pelo CEP
  const fetchAddress = async (cep: string) => {
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            street: data.logradouro,
            complement: data.complemento,
            city: data.localidade,
            state: data.uf
          }));
        }
      } catch (err) {
        console.error('Erro ao buscar CEP:', err);
      }
    }
  };

  useEffect(() => {
    if ((formData.cep ?? '').length === 8) {
      fetchAddress(formData.cep as string);
    }
  }, [formData.cep]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      await api.put('/users/personal-data', formData);
      setSuccess('Dados atualizados com sucesso!');
    } catch (err) {
      setError('Erro ao salvar dados pessoais');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <GlassCard className="p-6">
      <form onSubmit={handleSubmit} className="max-w-3xl">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>}
        {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">{success}</div>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Nome</label>
            <div className="relative">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
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
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Sobrenome</label>
            <div className="relative">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
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
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">CPF</label>
          <div className="relative">
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleCpfChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-r from-white/80 to-white/90 dark:from-gray-800/90 dark:to-gray-800/80"
              required
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiFileText className="text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 cursor-not-allowed bg-gradient-to-r from-gray-100/80 to-gray-100/90 dark:from-gray-700/90 dark:to-gray-700/80"
              disabled
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">CEP</label>
            <div className="relative">
              <input
                type="text"
                name="cep"
                value={formData.cep}
                onChange={handleCepChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-r from-white/80 to-white/90 dark:from-gray-800/90 dark:to-gray-800/80"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiHome className="text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Rua</label>
            <div className="relative">
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-r from-white/80 to-white/90 dark:from-gray-800/90 dark:to-gray-800/80"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiHome className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Número</label>
            <div className="relative">
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-r from-white/80 to-white/90 dark:from-gray-800/90 dark:to-gray-800/80"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiHome className="text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Complemento</label>
            <div className="relative">
              <input
                type="text"
                name="complement"
                value={formData.complement}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-r from-white/80 to-white/90 dark:from-gray-800/90 dark:to-gray-800/80"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiHome className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Cidade</label>
            <div className="relative">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-r from-white/80 to-white/90 dark:from-gray-800/90 dark:to-gray-800/80"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiHome className="text-gray-400" />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Estado</label>
            <div className="relative">
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-r from-white/80 to-white/90 dark:from-gray-800/90 dark:to-gray-800/80"
                required
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiHome className="text-gray-400" />
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
                Salvando...
              </>
            ) : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </GlassCard>
  );
};

export default PersonalData;