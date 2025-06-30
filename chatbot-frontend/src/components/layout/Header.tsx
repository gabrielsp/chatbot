import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ScrollLink from '../ui/ScrollLink';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authState, logout } = useAuth();
  const isHomePage = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header 
      className={`fixed-header px-4 sm:px-6 lg:px-8 py-4 ${isScrolled ? 'scrolled' : ''}`}
      id="fixedHeader"
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-white/30 mr-3" data-aos="fade-right" data-aos-duration="800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h1 className="text-xl logo-text" data-aos="fade-right" data-aos-duration="800" data-aos-delay="100">
            <Link to="/">ChatBot</Link>
          </h1>
        </div>
        
        <div className="hidden md:flex items-center">
          {isHomePage && !authState.isAuthenticated && ( // Ajuste condicional
            <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
              <ScrollLink to="#recursos" className="nav-link text-lg" data-section="recursos">Recursos</ScrollLink>
              <ScrollLink to="#como-funciona" className="nav-link text-lg" data-section="como-funciona">Como Funciona</ScrollLink>
              <ScrollLink to="#faq" className="nav-link text-lg" data-section="faq">FAQ</ScrollLink>
              <ScrollLink to="#contato" className="nav-link text-lg" data-section="contato">Contato</ScrollLink>
            </nav>
          )}
          
          <div className="flex items-center space-x-4">
            {authState.isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Página Principal
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn-primary text-gray-700 px-5 py-2 rounded-lg font-medium shadow-sm">
                Entrar
              </Link>
            )}
          </div>
        </div>
        
         {/* Versão mobile */}
         <div className="md:hidden">
          {authState.isAuthenticated ? (
            /* Menu mobile (autenticado) */
            <div className="relative">
              {/* ... ícone do usuário */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <Link 
                    to="/dashboard" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Página Principal
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Botão Entrar mobile (não autenticado) */
            <Link to="/login" className="btn-primary text-gray-700 px-4 py-2 rounded-lg font-medium shadow-sm text-sm">
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;