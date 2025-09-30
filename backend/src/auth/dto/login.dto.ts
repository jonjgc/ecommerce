import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'joao.silva@email.com',
    description: 'O e-mail cadastrado do usuário.',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'senha123',
    description: 'A senha cadastrada do usuário.',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
