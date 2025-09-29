'use client'

import styled from 'styled-components';
import { IMaskInput } from 'react-imask';
import { inputStyles } from '@/components/Input/styles';

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

export const StyledIMaskInput = styled(IMaskInput)`
  ${inputStyles}
`;