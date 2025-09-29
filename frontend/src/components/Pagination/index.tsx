import { Button } from "../Button";
import * as S from "./styles";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <S.Wrapper>
      <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Anterior
      </Button>
      <span>Página {currentPage} de {totalPages}</span>
      <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Próxima
      </Button>
    </S.Wrapper>
  );
};