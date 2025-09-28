import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Notebook Gamer Pro',
    description: 'O nome do produto. Deve ser uma string não vazia.',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Notebook com 16GB RAM, SSD 512GB e placa de vídeo dedicada.',
    description: 'A descrição detalhada do produto.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 4999.99,
    description: 'O preço de venda do produto. Deve ser um número positivo.',
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @ApiProperty({
    example: 50,
    description:
      'A quantidade do produto disponível em estoque. Deve ser um número inteiro igual ou maior que zero.',
  })
  @IsNumber()
  @Min(0)
  stock: number;
}
