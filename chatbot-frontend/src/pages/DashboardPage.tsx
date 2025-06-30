import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

import { 
  FiSun, FiMoon, FiHome, FiLogOut, 
  FiUser, FiMessageSquare, FiUsers, FiLock, 
  FiMonitor 
} from 'react-icons/fi';

import DashboardHome from './sections-Dashboard/DashboardHome';
import PersonalData from './sections-Dashboard/PersonalData';
import ChangePassword from './sections-Dashboard/ChangePassword';
import MyChatbot from './sections-Dashboard/MyChatbot';
import AddUser from './sections-Dashboard/AddUser';

const DashboardPage: React.FC = () => {
  const { authState, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('dashboard');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get('section') || 'dashboard';
    setActiveSection(section);
  }, [location]);

  const navigateToSection = (section: string) => {
    navigate(`/dashboard?section=${section}`);
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return <DashboardHome />;
      case 'personal-data':
        return <PersonalData />;
      case 'change-password':
        return <ChangePassword />;
      case 'my-chatbot':
        return <MyChatbot />;
      case 'add-user':
        return <AddUser />;
      default:
        return <DashboardHome />;
    }
  };

  const getThemeIcon = () => {
    if (theme === 'light') {
      return { icon: <FiMoon />, text: 'Modo Escuro' };
    } else if (theme === 'dark') {
      return { icon: <FiSun />, text: 'Modo Claro' };
    } else {
      return { icon: <FiMonitor />, text: 'Sistema' };
    }
  };

  const themeIcon = getThemeIcon();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Menu Lateral */}
      <div className="w-64 bg-gradient-to-b from-blue-600 to-teal-600 dark:from-gray-800 dark:to-gray-900 shadow-xl flex flex-col justify-between transition-colors duration-300">
        <div>
          <div className="p-6 border-b border-blue-500/30 dark:border-gray-700">
            <h2 className="text-xl font-bold text-white">Menu</h2>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {[
                { section: 'dashboard', label: 'Dashboard', icon: <FiHome /> },
                { section: 'personal-data', label: 'Dados Pessoais', icon: <FiUser /> },
                { section: 'change-password', label: 'Trocar Senha', icon: <FiLock /> },
                { section: 'my-chatbot', label: 'Meu ChatBot', icon: <FiMessageSquare /> },
                { section: 'add-user', label: 'Adicionar Usuário', icon: <FiUsers /> }
              ].map((item) => (
                <li key={item.section}>
                  <button
                    onClick={() => navigateToSection(item.section)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-all ${
                      activeSection === item.section
                        ? 'bg-white/20 text-white font-semibold'
                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="p-4 border-t border-blue-500/30 dark:border-gray-700">
          <button 
            onClick={toggleTheme}
            className="w-full mb-2 p-3 rounded-lg flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <span className="mr-2">{themeIcon.icon}</span>
            {themeIcon.text}
          </button>
          <button 
            onClick={logout}
            className="w-full p-3 rounded-lg flex items-center justify-center text-white hover:bg-red-500/20 transition-colors"
          >
            <FiLogOut className="mr-2" />
            Sair
          </button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-auto pt-16 h-screen p-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 bg-gradient-to-r from-blue-500/10 to-teal-500/10 p-6 rounded-2xl dark:from-blue-900/20 dark:to-teal-900/20">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white capitalize">
              {activeSection.replace('-', ' ')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Bem-vindo, {authState.user?.firstName}!
            </p>
          </div>
          
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;