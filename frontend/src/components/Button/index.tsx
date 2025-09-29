import { ButtonHTMLAttributes } from 'react';
import * as S from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = ({ children, fullWidth = true, ...rest }: ButtonProps) => {
  return <S.StyledButton $fullWidth={fullWidth} {...rest}>{children}</S.StyledButton>;
};