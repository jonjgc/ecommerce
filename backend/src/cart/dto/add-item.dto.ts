import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class AddItemDto {
  @ApiProperty({
    description: 'O ID do produto a ser adicionado ao carrinho.',
    example: 'f8b3b3b1-466f-9780-afd295dd793f',
  })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    description: 'A quantidade do produto a ser adicionada.',
    example: 2,
  })
  @IsNumber()
  @IsPositive()
  quantity: number;
}
