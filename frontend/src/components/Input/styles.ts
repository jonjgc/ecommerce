import styled, { css } from 'styled-components';

export const inputStyles = css`
  padding: ${({ theme }) => theme.spacing.medium};
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
  width: 100%;
  font-size: ${({ theme }) => theme.typography.body};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.medium};

  label {
    margin-bottom: ${({ theme }) => theme.spacing.small};
    font-weight: bold;
  }

  input {
    padding: ${({ theme }) => theme.spacing.medium};
    border: 1px solid ${({ theme }) => theme.colors.gray};
    border-radius: 4px;
    font-size: ${({ theme }) => theme.typography.body};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }

  input {
    ${inputStyles}
  }
`;