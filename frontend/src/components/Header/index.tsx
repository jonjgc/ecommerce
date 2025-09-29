'use client';

import { useCart } from '@/contexts/CartContext';
import * as S from './styles';

interface HeaderProps {
  onCartClick: () => void;
}

export const Header = ({ onCartClick }: HeaderProps) => {
  const { totalItems } = useCart();

  return (
    <S.Wrapper>
      <S.Logo>Loja Online</S.Logo>
      <S.CartButton onClick={onCartClick}>
        🛒
        {totalItems > 0 && <S.CartBadge>{totalItems}</S.CartBadge>}
      </S.CartButton>
    </S.Wrapper>
  );
};