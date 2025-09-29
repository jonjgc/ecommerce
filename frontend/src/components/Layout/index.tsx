'use client';

import { Header } from '../Header';
import { CartSidebar } from '../CartSidebar';
import { useState } from 'react';
import * as S from './styles';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <S.Wrapper>
      <Header onCartClick={() => setIsCartOpen(true)} />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <S.Main>{children}</S.Main>
    </S.Wrapper>
  );
};