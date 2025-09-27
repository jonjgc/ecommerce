import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class AddItemDto {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
