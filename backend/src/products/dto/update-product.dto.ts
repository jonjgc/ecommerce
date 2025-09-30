import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    example: 'Notebook Gamer Pro X',
    description: 'O nome do produto.',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'Notebook com 32GB RAM e SSD 1TB.',
    description: 'A descrição detalhada do produto.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 5500.0,
    description: 'O preço de venda do produto.',
    required: false,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price?: number;

  @ApiProperty({
    example: 25,
    description: 'A quantidade do produto em estoque.',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number;
}
