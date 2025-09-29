'use client'
import styled from 'styled-components';

export const FormWrapper = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.large};
  }
`;

export const RegisterLink = styled.p`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.medium};

  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;