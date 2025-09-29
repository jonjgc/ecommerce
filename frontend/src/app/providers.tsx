'use client'

import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from '@/styles/global'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/contexts/CartContext'
import { lightTheme, darkTheme } from '@/styles/theme'
import { ThemeManagerProvider, useThemeManager } from '@/contexts/ThemeManagerContext';

const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { themeMode } = useThemeManager();
  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
      <Toaster position="top-center" />
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeManagerProvider>
      <AuthProvider>
        <CartProvider>
          <AppThemeProvider>
            {children}
          </AppThemeProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeManagerProvider>
  )
}