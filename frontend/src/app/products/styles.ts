'use client';
import styled from 'styled-components';

export const Container = styled.div`
  h1 {
    margin-bottom: ${({ theme }) => theme.spacing.large};
  }
`;

export const TopActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

export const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid ${({ theme }) => theme.colors.gray};
    padding: ${({ theme }) => theme.spacing.medium};
    text-align: left;
  }

  th {
    background-color: ${({ theme }) => theme.colors.background};
  }

  td:last-child {
    width: 150px;
    text-align: center;
  }
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin: 0 5px;

  &:hover {
    opacity: 0.7;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;