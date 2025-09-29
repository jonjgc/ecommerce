import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class QueryProductDto {
  @ApiProperty({
    required: false,
    description: 'Número da página para a paginação',
    default: 1,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page?: number;

  @ApiProperty({
    required: false,
    description: 'Quantidade de itens por página',
    default: 10,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  limit?: number;

  @ApiProperty({
    required: false,
    description: 'Filtrar produtos por nome (busca parcial, case-insensitive)',
    example: 'Galaxy',
  })
  @IsOptional()
  @IsString()
  name?: string;
}
