'use client';

import { useCart } from '@/contexts/CartContext';
import * as S from './styles';

export const Header = () => {
  const { totalItems } = useCart();

  return (
    <S.Wrapper>
      <S.Logo>Loja Online</S.Logo>
      <S.CartButton>
        🛒
        {totalItems > 0 && <S.CartBadge>{totalItems}</S.CartBadge>}
      </S.CartButton>
    </S.Wrapper>
  );
};