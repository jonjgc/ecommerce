'use client';

import { IProduct } from '@/types/product';
import { Button } from '../Button';
import { useCart } from '@/contexts/CartContext';
import * as S from './styles';

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

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
      <Button onClick={() => addToCart(product)}>Adicionar ao Carrinho</Button>
    </S.Wrapper>
  );
};