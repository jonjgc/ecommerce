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

  @media (max-width: 768px) {
    thead {
      display: none;
    }

    tr {
      display: block;
      margin-bottom: ${({ theme }) => theme.spacing.large};
      border: 1px solid ${({ theme }) => theme.colors.gray};
      border-radius: 4px;
    }

    td {
      display: block;
      text-align: right; /* Alinha o valor à direita */
      position: relative;
      padding-left: 50%;
      border: none;
      border-bottom: 1px solid #eee;

      &:before {
        content: attr(data-label);
        position: absolute;
        left: 10px;
        width: calc(50% - 20px);
        text-align: left;
        font-weight: bold;
      }

      &:last-child {
        width: 100%;
        text-align: center;
        border-bottom: none;
      }
    }
  };
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
