import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'João da Silva',
    description: 'O nome completo do usuário.',
  })
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  name: string;

  @ApiProperty({
    example: 'joao.silva@email.com',
    description: 'O e-mail do usuário, que será usado para login.',
  })
  @IsEmail({}, { message: 'Por favor, insira um email válido.' })
  email: string;

  @ApiProperty({
    example: '123.456.789-00',
    description: 'O CPF do usuário. Deve ser único.',
  })
  @IsString()
  @IsNotEmpty({ message: 'O CPF não pode ser vazio.' })
  cpf: string;

  @ApiProperty({
    example: 'senha123',
    description: 'A senha do usuário. Deve ter no mínimo 6 caracteres.',
    minLength: 6,
  })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  password: string;
}
