'use client'

import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from '@/styles/global'
import { AuthProvider } from '@/contexts/AuthContext'
import theme from '@/styles/theme'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/contexts/CartContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <Toaster position="top-center" />
          <GlobalStyles />
          {children}
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}