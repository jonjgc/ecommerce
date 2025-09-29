import styled from 'styled-components';

export const ToggleButton = styled.button`
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  margin-left: ${({ theme }) => theme.spacing.medium};
`;