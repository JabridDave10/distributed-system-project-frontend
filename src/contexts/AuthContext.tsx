import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type UserInfo } from '../types/auth';
import api from '../api/apiClient';

interface AuthContextType {
  user: UserInfo | null;
  isAuthenticated: boolean;
  login: (user: UserInfo, token?: string) => void;
  logout: () => void;
  loading: boolean;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Inicializar sin verificar autenticación automáticamente
    // La verificación se hará solo cuando sea necesario
    setLoading(false);
  }, []);

  const login = (userData: UserInfo, token?: string) => {
    setUser(userData);
    // Guardar token en localStorage para compatibilidad con producción
    if (token) {
      localStorage.setItem('auth_token', token);
    }
  };

  const logout = async () => {
    try {
      // Llamar al endpoint de logout para eliminar la cookie HttpOnly
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setUser(null);
      // Limpiar token del localStorage
      localStorage.removeItem('auth_token');
    }
  };

  const checkAuth = async (): Promise<boolean> => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data);
      return true;
    } catch (error) {
      console.error('Error checking auth:', error);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
