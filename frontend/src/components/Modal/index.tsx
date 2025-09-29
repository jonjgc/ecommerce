'use client';

import { ReactNode } from 'react';
import * as S from './styles';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <S.Overlay onClick={onClose}>
      <S.Content onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <h2>{title}</h2>
          <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
        </S.Header>
        {children}
      </S.Content>
    </S.Overlay>
  );
};