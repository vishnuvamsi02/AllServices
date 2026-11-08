'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppUser, UserRole } from '@/data/types';
import { useLanguage } from './LanguageContext';

interface AuthContextType {
  currentUser: AppUser | null;
  role: UserRole;
  isLoggedIn: boolean;
  login: (phone: string, role?: UserRole, villageId?: string) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PRESET_USERS: Record<UserRole, AppUser> = {
  guest: {
    id: 'guest_user',
    name: 'Guest Visitor',
    phone: '',
    role: 'guest',
    languagePreference: 'en',
  },
  customer: {
    id: 'cust_101',
    name: 'K. Srinivasa Rao',
    phone: '9848111222',
    role: 'customer',
    villageId: 'v_kaza',
    villageName: 'Kaza',
    languagePreference: 'en',
  },
  provider: {
    id: 'p_1',
    name: 'Babu Rao (Electrician)',
    phone: '9849123456',
    role: 'provider',
    villageId: 'v_kaza',
    villageName: 'Kaza',
    languagePreference: 'en',
  },
  business: {
    id: 'b_1',
    name: 'Venkateswarlu (Sri Lakshmi Agro Seeds)',
    phone: '9849567890',
    role: 'business',
    villageId: 'v_kaza',
    villageName: 'Kaza',
    languagePreference: 'en',
  },
  property_owner: {
    id: 'prop_owner_1',
    name: 'M. Sambasiva Rao',
    phone: '9849890123',
    role: 'property_owner',
    villageId: 'v_kaza',
    villageName: 'Kaza',
    languagePreference: 'en',
  },
  village_admin: {
    id: 'v_admin_kaza',
    name: 'Chalasani Venkateswara Rao (Kaza Admin)',
    phone: '9848022331',
    role: 'village_admin',
    villageId: 'v_kaza',
    villageName: 'Kaza',
    languagePreference: 'en',
  },
  super_admin: {
    id: 'super_admin_ap',
    name: 'Andhra Pradesh State Admin Director',
    phone: '9900112233',
    role: 'super_admin',
    languagePreference: 'en',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const { setLanguage } = useLanguage();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('gramaseva_current_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        setCurrentUser(parsed);
      }
    } catch (e) {
      console.warn('Failed to restore auth', e);
    }
  }, []);

  const login = (phone: string, role: UserRole = 'customer', villageId: string = 'v_kaza') => {
    const user: AppUser = {
      id: `user_${Date.now()}`,
      name: role === 'customer' ? 'Ramana Murthy' : 'Authorized User',
      phone,
      role,
      villageId,
      villageName: villageId === 'v_kaza' ? 'Kaza' : 'Pedakakani',
      languagePreference: 'en',
    };

    setCurrentUser(user);
    try {
      localStorage.setItem('gramaseva_current_user', JSON.stringify(user));
    } catch (e) {
      console.warn('Storage save failed', e);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('gramaseva_current_user');
    } catch (e) {
      console.warn('Storage remove failed', e);
    }
  };

  const switchRole = (newRole: UserRole) => {
    if (newRole === 'guest') {
      logout();
      return;
    }
    const preset = PRESET_USERS[newRole];
    setCurrentUser(preset);
    try {
      localStorage.setItem('gramaseva_current_user', JSON.stringify(preset));
      if (preset.languagePreference) {
        setLanguage(preset.languagePreference);
      }
    } catch (e) {
      console.warn('Storage switch failed', e);
    }
  };

  const role = currentUser?.role || 'guest';
  const isLoggedIn = currentUser !== null && role !== 'guest';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        isLoggedIn,
        login,
        logout,
        switchRole,
      }}
    >
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
