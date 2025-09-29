'use client';
import styled from 'styled-components';

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

export const LoadingMessage = styled.p`
  font-size: 1.2rem;
  text-align: center;
  padding: 4rem;
`;