import React, { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import api from '../../services/api';
import { FiMessageSquare, FiHome, FiFileText } from 'react-icons/fi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import GlassCard from '../../components/ui/GlassCard';
//import QuillWrapper from '../../components/ui/QuillWrapper';

type ChatbotConfig = {
  phone: string;
  companyName: string;
  welcomeMessage: string;
  files: string[];
};

const MyChatbot: React.FC = () => {
  const [config, setConfig] = useState<ChatbotConfig>({
    phone: '',
    companyName: '',
    welcomeMessage: 'Olá! Como posso ajudar?',
    files: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fileInput, setFileInput] = useState<File | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await api.get('/chatbot/config');
        setConfig({
          ...(response.data as ChatbotConfig),
          phone: (response.data as any)?.phone || '',
          companyName: (response.data as any)?.companyName || '',
          welcomeMessage: (response.data as any)?.welcomeMessage || 'Olá! Como posso ajudar?',
          files: (response.data as any)?.files || [],
        });
      } catch (error) {
        console.error('Erro ao buscar configurações:', error);
        // Fallback para dados locais
        const localConfig = localStorage.getItem('chatbotConfig');
        if (localConfig) {
          setConfig(JSON.parse(localConfig) as ChatbotConfig);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleWelcomeMessageChange = (value: string) => {
    setConfig(prev => ({ ...prev, welcomeMessage: value }));
  };

  // Filtro para telefone: somente números e limita a 13 dígitos
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    setConfig(prev => ({ ...prev, phone: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileInput(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      if (fileInput) {
        const formData = new FormData();
        formData.append('file', fileInput);
        
        const uploadResponse = await api.post('/chatbot/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        setConfig(prev => ({
          ...prev,
          files: [...prev.files, (uploadResponse.data as { fileId: string }).fileId]
        }));
      }

      await api.put('/chatbot/config', config);
      setSuccess('Configurações salvas com sucesso!');
    } catch (err) {
      setError('Erro ao salvar configurações');
    } finally {
      setSaving(false);
      setFileInput(null);
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
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Número do WhatsApp</label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              value={config.phone}
              onChange={handlePhoneChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-r from-white/80 to-white/90 dark:from-gray-800/90 dark:to-gray-800/80"
              placeholder="+55 (11) 99999-9999"
              required
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMessageSquare className="text-gray-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Somente números (ex: 5511999999999)</p>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Nome da Empresa</label>
          <div className="relative">
            <input
              type="text"
              name="companyName"
              value={config.companyName}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-r from-white/80 to-white/90 dark:from-gray-800/90 dark:to-gray-800/80"
              required
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiHome className="text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Mensagem de Boas-Vindas</label>
          <div className="relative">
            <ReactQuill
              value={config.welcomeMessage}
              onChange={handleWelcomeMessageChange}
              modules={{
                toolbar: [
                  [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                  [{ size: [] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                  ['link', 'image', 'video'],
                  ['clean'],
                  ['emoji']
                ]
              }}
              formats={[
                'header', 'font', 'size',
                'bold', 'italic', 'underline', 'strike', 'blockquote',
                'list', 'bullet',
                'link', 'image', 'video',
                'emoji'
              ]}
              className="bg-white dark:bg-gray-800 rounded-lg"
            />
          </div>
        </div>
        
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Upload de Arquivos</label>
          <div className="flex items-center">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-gray-300 dark:border-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FiFileText className="w-8 h-8 mb-2 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOCX, TXT (MAX. 10MB)</p>
              </div>
              <input 
                type="file" 
                className="hidden" 
                onChange={handleFileChange}
              />
            </label>
          </div>
          
          {fileInput && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Arquivo selecionado: {fileInput.name}
            </p>
          )}
          
          {config.files.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Arquivos carregados:</p>
              <ul className="space-y-1">
                {config.files.map((file, index) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    <FiFileText className="mr-2" /> {file}
                  </li>
                ))}
              </ul>
            </div>
          )}
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
            ) : 'Salvar Configurações'}
          </button>
        </div>
      </form>
    </GlassCard>
  );
};

export default MyChatbot;