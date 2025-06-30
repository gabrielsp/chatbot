import React, { useState, useEffect } from 'react';
import GlassCard from '../../components/ui/GlassCard';
import api from '../../services/api';
import { FiMessageSquare, FiUser, FiSettings, FiUsers } from 'react-icons/fi';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useAuth } from '../../contexts/AuthContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type DashboardStats = {
  totalMessages: number;
  resolutionRate: number;
  satisfactionRate: number;
  activeChats: number;
  avgResponseTime: string;
  messagesData: number[];
  satisfactionData: number[];
};

const DashboardHome: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { logout } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/users/stats');
        setStats(response.data as DashboardStats);
      } catch (error: any) {
        console.error('Failed to fetch stats:', error);
        
        if (error.response) {
          // Erro com resposta do servidor
          if (error.response.status === 401) {
            logout();
          } else {
            setError('Failed to load statistics: ' + error.response.data.message);
          }
        } else {
          // Erro sem resposta (rede, CORS, etc)
          setError('Network error. Please check your connection.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 dark:text-red-400 text-center p-4">
        {error}
      </div>
    );
  }

  const messagesChartData = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Mensagens Recebidas',
        data: stats?.messagesData || [12, 19, 14, 16, 18, 15, 20],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
      {
        label: 'Mensagens Respondidas',
        data: stats?.messagesData?.map(val => val * 0.85) || [10, 16, 12, 14, 15, 13, 17],
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1,
      }
    ],
  };

  const satisfactionChartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Satisfação do Cliente (%)',
        data: stats?.satisfactionData || [85, 88, 90, 92, 91, 93],
        borderColor: 'rgb(234, 179, 8)',
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        fill: true,
        tension: 0.3,
      }
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="p-6 flex flex-col bg-gradient-to-br from-blue-50/50 to-blue-100/50 dark:from-blue-900/30 dark:to-blue-800/30">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 mr-3">
              <FiMessageSquare size={20} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Mensagens Hoje</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats?.totalMessages || 0}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">+12% desde ontem</p>
        </GlassCard>
        
        <GlassCard className="p-6 flex flex-col bg-gradient-to-br from-green-50/50 to-green-100/50 dark:from-green-900/30 dark:to-green-800/30">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300 mr-3">
              <FiUser size={20} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Taxa de Resolução</h3>
          </div>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats?.resolutionRate || 0}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${stats?.resolutionRate || 0}%` }}
            ></div>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6 flex flex-col bg-gradient-to-br from-yellow-50/50 to-yellow-100/50 dark:from-yellow-900/30 dark:to-yellow-800/30">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-300 mr-3">
              <FiUser size={20} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Satisfação</h3>
          </div>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats?.satisfactionRate || 0}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div 
              className="bg-yellow-500 h-2 rounded-full" 
              style={{ width: `${stats?.satisfactionRate || 0}%` }}
            ></div>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6 flex flex-col bg-gradient-to-br from-purple-50/50 to-purple-100/50 dark:from-purple-900/30 dark:to-purple-800/30">
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 mr-3">
              <FiMessageSquare size={20} />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Tempo de Resposta</h3>
          </div>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats?.avgResponseTime || '0s'}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Média nas últimas 24h</p>
        </GlassCard>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6 bg-gradient-to-br from-indigo-50/50 to-indigo-100/50 dark:from-indigo-900/30 dark:to-indigo-800/30">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Mensagens por Dia</h3>
          <Bar 
            data={messagesChartData} 
            options={{
              responsive: true,
              plugins: {
                legend: {
                  labels: {
                    color: '#4b5563'
                  }
                }
              },
              scales: {
                x: {
                  grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                  },
                  ticks: {
                    color: '#4b5563'
                  }
                },
                y: {
                  grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                  },
                  ticks: {
                    color: '#4b5563'
                  }
                }
              }
            }}
          />
        </GlassCard>
        
        <GlassCard className="p-6 bg-gradient-to-br from-teal-50/50 to-teal-100/50 dark:from-teal-900/30 dark:to-teal-800/30">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Evolução da Satisfação</h3>
          <Line 
            data={satisfactionChartData} 
            options={{
              responsive: true,
              plugins: {
                legend: {
                  labels: {
                    color: '#4b5563'
                  }
                }
              },
              scales: {
                x: {
                  grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                  },
                  ticks: {
                    color: '#4b5563'
                  }
                },
                y: {
                  min: 80,
                  max: 100,
                  grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                  },
                  ticks: {
                    color: '#4b5563'
                  }
                }
              }
            }}
          />
        </GlassCard>
      </div>
      
      <GlassCard className="p-6 bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/30 dark:to-gray-700/30">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Atividade Recente</h3>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
            Ver tudo
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start border-b border-gray-200 dark:border-gray-700 pb-4">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 mr-3">
              <FiUser size={16} />
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">Novo chatbot criado</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Há 2 horas</p>
              <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">Você configurou um novo chatbot para atendimento ao cliente</p>
            </div>
          </div>
          
          <div className="flex items-start border-b border-gray-200 dark:border-gray-700 pb-4">
            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300 mr-3">
              <FiSettings size={16} />
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">Atualização de modelo</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Há 5 horas</p>
              <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">O modelo de IA foi atualizado para a versão 2.5</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 mr-3">
              <FiUsers size={16} />
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">Novo usuário registrado</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Ontem</p>
              <p className="text-sm mt-1 text-gray-700 dark:text-gray-300">Maria Silva foi adicionada como atendente</p>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default DashboardHome;