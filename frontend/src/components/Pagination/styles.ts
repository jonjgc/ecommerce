import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.large};
  gap: ${({ theme }) => theme.spacing.medium};

  button {
    width: auto;
    padding: 8px 16px;
  }

  span {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
  }
`;