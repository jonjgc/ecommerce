import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { email, name } = createUserDto;

    const userExists = await this.usersRepository.findOneBy({ email });
    if (userExists) {
      throw new ConflictException('Este endereço de email já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const confirmationToken = uuidv4();

    const newUser = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      isActive: false,
      confirmationToken,
    });

    await this.usersRepository.save(newUser);

    console.log('--- E-MAIL DE CONFIRMAÇÃO (SIMULADO) ---');
    console.log(`Olá ${name}, seja bem-vindo(a)!`);
    console.log('Para ativar sua conta, acesse o link abaixo:');
    console.log(
      `http://localhost:3000/auth/confirm?token=${confirmationToken}`,
    );
    console.log('-----------------------------------------');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser;
    return result;
  }
}
