import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly mailerService: MailerService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const { email, name, cpf } = createUserDto;

    const userExists = await this.usersRepository.findOneBy({ email });
    if (userExists) {
      throw new ConflictException('Este endereço de email já está em uso.');
    }

    const cpfExists = await this.usersRepository.findOneBy({ cpf });
    if (cpfExists) {
      throw new ConflictException('Este CPF já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const confirmationToken = uuidv4();

    const newUser = this.usersRepository.create({
      name,
      email,
      cpf,
      password: hashedPassword,
      isActive: false,
      confirmationToken,
    });

    await this.usersRepository.save(newUser);
    const confirmationUrl = `http://localhost:3000/auth/confirm?token=${confirmationToken}`;

    await this.mailerService.sendMail({
      to: newUser.email,
      subject: 'Bem-vindo(a) à Loja Online! Confirme seu e-mail.',
      html: `
        <p>Olá ${newUser.name},</p>
        <p>Seu cadastro foi realizado com sucesso. Por favor, clique no link abaixo para ativar sua conta:</p>
        <a href="${confirmationUrl}">Ativar Conta</a>
      `,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser;
    return result;
  }
}
