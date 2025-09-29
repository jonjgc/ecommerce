'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type ThemeMode = 'light' | 'dark';

interface IThemeManagerContext {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeManagerContext = createContext({} as IThemeManagerContext);

export const ThemeManagerProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  useEffect(() => {
    const storagedTheme = localStorage.getItem('@LojaOnline:theme') as ThemeMode;
    if (storagedTheme) {
      setThemeMode(storagedTheme);
    }
  }, []);

  const toggleTheme = () => {
    setThemeMode(prevMode => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('@LojaOnline:theme', newMode);
      return newMode;
    });
  };

  return (
    <ThemeManagerContext.Provider value={{ themeMode, toggleTheme }}>
      {children}
    </ThemeManagerContext.Provider>
  );
};

export const useThemeManager = () => useContext(ThemeManagerContext);