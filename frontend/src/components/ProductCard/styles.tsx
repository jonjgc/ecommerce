import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: ${({ theme }) => theme.spacing.large};
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

export const Description = styled.p`
  flex-grow: 1;
  color: #666;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const Price = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const Stock = styled.span`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;