'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/services/api';

interface IUser {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface IAuthContextData {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  signIn: (credentials: ISignInCredentials) => Promise<void>;
  signOut: () => void;
}

interface IAuthProviderProps {
  children: ReactNode;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const storagedUser = localStorage.getItem('@LojaOnline:user');
    const storagedToken = localStorage.getItem('@LojaOnline:token');

    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser));
      setToken(storagedToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
    }
  }, []);

  async function signIn({ email, password }: ISignInCredentials) {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      const { user: apiUser, token: apiToken } = response.data;

      setUser(apiUser);
      setToken(apiToken);

      localStorage.setItem('@LojaOnline:user', JSON.stringify(apiUser));
      localStorage.setItem('@LojaOnline:token', apiToken);

      api.defaults.headers.common['Authorization'] = `Bearer ${apiToken}`;
      
    } catch (error) {
      console.error('Falha no login:', error);
      throw error;
    }
  }

  function signOut() {
    setUser(null);
    setToken(null);

    localStorage.removeItem('@LojaOnline:user');
    localStorage.removeItem('@LojaOnline:token');

    delete api.defaults.headers.common['Authorization'];

  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}