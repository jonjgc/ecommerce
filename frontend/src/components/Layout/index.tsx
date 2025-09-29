'use client';

import { Header } from '../Header';
import * as S from './styles';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <S.Wrapper>
      <Header />
      <S.Main>{children}</S.Main>
    </S.Wrapper>
  );
};