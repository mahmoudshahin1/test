import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, UserRole, ROLE_PERMISSIONS, RolePermissions } from './types';
import { mockUsers } from './data';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  permissions: RolePermissions;
  hasPermission: (key: keyof RolePermissions) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('qc_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((username: string, password: string): boolean => {
    const found = mockUsers.find(u => u.username === username && u.password === password && u.isActive);
    if (found) {
      setUser(found);
      localStorage.setItem('qc_user', JSON.stringify(found));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('qc_user');
  }, []);

  const permissions = user ? ROLE_PERMISSIONS[user.role as UserRole] : ROLE_PERMISSIONS.viewer;
  
  const hasPermission = useCallback((key: keyof RolePermissions): boolean => {
    return permissions[key];
  }, [permissions]);

  return (
    <AuthContext.Provider value={{ user, login, logout, permissions, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
