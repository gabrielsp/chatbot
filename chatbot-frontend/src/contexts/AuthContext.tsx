import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import api from '../services/api';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

interface AuthContextType {
  authState: AuthState;
  setAuthState: (state: AuthState) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authState, setAuthState] = useState<AuthState>({
      isAuthenticated: false,
      user: null,
    });
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      
      if (token) {
        const fetchUserProfile = async () => {
          try {
            // Busca os dados reais do usuário do backend
            const response = await api.get('/users/profile');
            
            setAuthState({
              isAuthenticated: true,
              user: response.data as User
            });
          } catch (error) {
            console.error('Falha ao buscar perfil do usuário:', error);
            logout();
          } finally {
            setLoading(false);
          }
        };
        
        fetchUserProfile();
      } else {
        setLoading(false);
      }
    }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('No refresh token');
      
      const response = await api.post('/auth/refresh-token', { refreshToken });
      const { accessToken } = response.data as any;
      
      localStorage.setItem('token', accessToken);
      return accessToken;
    } catch (error) {
      logout();
      return null;
    }
  };

  api.interceptors.response.use(
    response => response,
    async error => {
      // Trate casos onde não há resposta (erros de rede, CORS, etc)
      if (!error.response) {
        console.error('Network/CORS error:', error);
        return Promise.reject({
          response: {
            status: 0,
            data: { message: 'Network error or CORS issue' }
          }
        });
      }
  
      const originalRequest = error.config;
      
      // Se erro 401 e não é requisição de refresh
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        const newToken = await refreshAccessToken();
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      }
      
      return Promise.reject(error);
    }
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ authState, setAuthState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
