'use client';

import * as S from './styles';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <S.Wrapper>
      <S.Main>{children}</S.Main>
    </S.Wrapper>
  );
};