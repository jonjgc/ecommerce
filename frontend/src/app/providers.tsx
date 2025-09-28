'use client'

import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from '@/styles/global'
import { AuthProvider } from '@/contexts/AuthContext'
import theme from '@/styles/theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyles />
        {children}
      </AuthProvider>
    </ThemeProvider>
  )
}