'use client';

import { useCart } from '@/contexts/CartContext';
import { Button } from '../Button';
import * as S from './styles';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { items, totalPrice, removeFromCart, updateItemQuantity } = useCart();

  const formattedTotalPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(totalPrice);

  return (
    <>
      <S.Overlay $isOpen={isOpen} onClick={onClose} />
      <S.SidebarContainer $isOpen={isOpen}>
        <S.Header>
          <h2>Seu Carrinho</h2>
          <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
        </S.Header>

        <S.CartItemsList>
          {items.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            items.map(item => (
              <S.CartItem key={item.id}>
                <S.ItemInfo>
                  <p><strong>{item.name}</strong></p>
                  <p className="price">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}</p>
                </S.ItemInfo>
                <S.ItemActions>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => updateItemQuantity(item.id, Number(e.target.value))}
                  />
                  <S.RemoveButton onClick={() => removeFromCart(item.id)}>🗑️</S.RemoveButton>
                </S.ItemActions>
              </S.CartItem>
            ))
          )}
        </S.CartItemsList>

        {items.length > 0 && (
          <S.Footer>
            <S.Total>
              <span>Total:</span>
              <span>{formattedTotalPrice}</span>
            </S.Total>
            <Button>Finalizar Compra</Button>
          </S.Footer>
        )}
      </S.SidebarContainer>
    </>
  );
};