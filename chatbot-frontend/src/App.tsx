import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Layout from './components/layout/Layout';
import ScrollToTop from './components/ui/ScrollToTop';
import { useAOS } from './contexts/AOSContext';
import ProtectedRoute from './contexts/ProtectedRoute';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import VerifyEmailPage from './pages/VerifyEmailPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import { ThemeProvider } from './contexts/ThemeContext';

// Componente wrapper para atualizar animações na mudança de rota
const AOSUpdater: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { refresh } = useAOS();

  useEffect(() => {
    // Atualizar animações após a mudança de rota
    const timer = setTimeout(() => {
      refresh();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [location.pathname, refresh]);

  return <>{children}</>;
};

const AppRoutes = () => {
  const { authState } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={
        <Layout>
          <AOSUpdater>
            <HomePage />
          </AOSUpdater>
        </Layout>
      } />
      <Route path="/login" element={
        authState.isAuthenticated ? <Navigate to="/dashboard" /> : 
        <Layout>
          <AOSUpdater>
            <LoginPage />
          </AOSUpdater>
        </Layout>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout>
            <AOSUpdater>
              <DashboardPage />
            </AOSUpdater>
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/forgot-password" element={
        <ProtectedRoute>
          <Layout>
            <AOSUpdater>
              <ForgotPasswordPage />
            </AOSUpdater>
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/verify-email" element={
        <Layout>
          <VerifyEmailPage />
        </Layout>
      } />
      <Route path="/auth-callback" element={
        <Layout>
          <AuthCallbackPage />
        </Layout>
      } />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
