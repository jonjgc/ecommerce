'use client';

import { useThemeManager } from '@/contexts/ThemeManagerContext';
import * as S from './styles';

export const ThemeToggler = () => {
  const { themeMode, toggleTheme } = useThemeManager();

  return (
    <S.ToggleButton onClick={toggleTheme}>
      {themeMode === 'light' ? '🌙' : '☀️'}
    </S.ToggleButton>
  );
};