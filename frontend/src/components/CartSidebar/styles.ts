import styled from 'styled-components';

export const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease;
  z-index: 1000;
`;

export const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: -2px 0 5px rgba(0,0,0,0.1);
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  transition: transform 0.3s ease;
  z-index: 1001;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CartItemsList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.medium};
`;

export const CartItem = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  border-bottom: 1px solid #eee;
  padding-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const ItemInfo = styled.div`
  flex-grow: 1;
  p { margin: 0; }
  .price {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ItemActions = styled.div`
  display: flex;
  align-items: center;

  input {
    width: 50px;
    text-align: center;
    margin: 0 10px;
    padding: 5px;
    font-size: 1rem;
  }
`;

export const Footer = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
`;

export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
`;

export const RemoveButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0 5px;
  line-height: 1; /* Alinha melhor o emoji */
`;