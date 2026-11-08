'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Village } from '@/data/types';
import { MOCK_VILLAGES } from '@/data/mockData';

interface LocationContextType {
  selectedVillageId: string; // 'all' or village id
  selectedVillage: Village | null;
  villages: Village[];
  setSelectedVillageId: (id: string) => void;
  getVillageName: (id: string, isTelugu?: boolean) => string;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'gramaseva_village';

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedVillageId, setSelectedVillageIdState] = useState<string>('v_kaza');
  const [villages] = useState<Village[]>(MOCK_VILLAGES);

  useEffect(() => {
    try {
      const savedVillage = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedVillage) {
        setSelectedVillageIdState(savedVillage);
      }
    } catch (e) {
      console.warn('Could not read village from storage', e);
    }
  }, []);

  const setSelectedVillageId = (id: string) => {
    setSelectedVillageIdState(id);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, id);
    } catch (e) {
      console.warn('Could not save village to storage', e);
    }
  };

  const selectedVillage = villages.find(v => v.id === selectedVillageId) || null;

  const getVillageName = (id: string, isTelugu: boolean = false): string => {
    if (id === 'all') {
      return isTelugu ? 'అన్ని గ్రామాలు' : 'All Villages';
    }
    const found = villages.find(v => v.id === id);
    if (!found) return id;
    return isTelugu ? found.teluguName : found.name;
  };

  return (
    <LocationContext.Provider
      value={{
        selectedVillageId,
        selectedVillage,
        villages,
        setSelectedVillageId,
        getVillageName,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
