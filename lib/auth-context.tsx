'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface AuthUser {
  id: string;
  email: string;
  username: string;
  nickname: string;
  avatar?: string;
  points: number;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, nickname: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const token = localStorage.getItem('wcz_token');
      const userData = localStorage.getItem('wcz_user');
      if (token && userData) {
        setUser(JSON.parse(userData));
      }
    } catch {
      localStorage.removeItem('wcz_token');
      localStorage.removeItem('wcz_user');
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setUser(data.data.user);
        localStorage.setItem('wcz_token', data.data.token);
        localStorage.setItem('wcz_user', JSON.stringify(data.data.user));
        return { success: true };
      }
      return { success: false, error: data.error || '登录失败' };
    } catch {
      return { success: false, error: '网络错误' };
    }
  }, []);

  const register = useCallback(async (email: string, nickname: string, password: string) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nickname, password }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setUser(data.data.user);
        localStorage.setItem('wcz_token', data.data.token);
        localStorage.setItem('wcz_user', JSON.stringify(data.data.user));
        return { success: true };
      }
      return { success: false, error: data.error || '注册失败' };
    } catch {
      return { success: false, error: '网络错误' };
    }
  }, []);

  const updateUser = useCallback((updates: Partial<AuthUser>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem('wcz_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('wcz_token');
    localStorage.removeItem('wcz_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
