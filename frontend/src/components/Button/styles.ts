import styled from 'styled-components';

export const StyledButton = styled.button<{ $fullWidth?: boolean }>`
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.typography.body};
  font-weight: bold;
  transition: background-color 0.2s;
  
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};

  &:hover {
    filter: brightness(0.9);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray};
    cursor: not-allowed;
  }
`;