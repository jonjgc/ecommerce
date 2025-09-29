import { InputHTMLAttributes } from 'react';
import * as S from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({ label, ...rest }: InputProps) => {
  return (
    <S.Wrapper>
      <label>{label}</label>
      <input {...rest} />
    </S.Wrapper>
  );
};