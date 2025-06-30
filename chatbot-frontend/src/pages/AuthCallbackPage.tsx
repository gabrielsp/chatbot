import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthCallbackPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuthState } = useAuth();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    
    if (token) {
      localStorage.setItem('token', token);
      
      // Buscar dados do usuário
      const fetchUser = async () => {
        try {
          const response = await fetch('/api/users/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const user = await response.json();
          
          setAuthState({ isAuthenticated: true, user });
          navigate('/dashboard');
        } catch (error) {
          navigate('/login');
        }
      };
      
      fetchUser();
    } else {
      navigate('/login');
    }
  }, [location, navigate, setAuthState]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Autenticando...</p>
    </div>
  );
};

export default AuthCallbackPage;