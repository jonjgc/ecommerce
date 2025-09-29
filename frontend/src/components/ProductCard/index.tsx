'use client';

import { IProduct } from '@/types/product';
import { Button } from '../Button';
import * as S from './styles';

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  return (
    <S.Wrapper>
      <S.Title>{product.name}</S.Title>
      <S.Description>{product.description}</S.Description>
      <S.Price>{formattedPrice}</S.Price>
      <S.Stock>Estoque: {product.stock}</S.Stock>
      <Button>Adicionar ao Carrinho</Button>
    </S.Wrapper>
  );
};