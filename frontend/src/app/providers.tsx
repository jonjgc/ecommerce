'use client'

import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from '@/styles/global'
import { AuthProvider } from '@/contexts/AuthContext'
import theme from '@/styles/theme'
import { Toaster } from 'react-hot-toast'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Toaster position="top-right" />
        <GlobalStyles />
        {children}
      </AuthProvider>
    </ThemeProvider>
  )
}