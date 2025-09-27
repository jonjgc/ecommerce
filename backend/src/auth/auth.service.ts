import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async confirmAccount(token: string): Promise<{ message: string }> {
    const user = await this.usersRepository.findOneBy({
      confirmationToken: token,
    });

    if (!user) {
      throw new NotFoundException('Token de confirmação inválido.');
    }

    user.isActive = true;
    user.confirmationToken = null!;
    await this.usersRepository.save(user);

    return { message: 'Conta ativada com sucesso!' };
  }

  async login(email: string, pass: string): Promise<{ accessToken: string }> {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    if (!user.isActive) {
      throw new UnauthorizedException(
        'Sua conta não está ativa. Por favor, verifique seu e-mail.',
      );
    }

    const isPasswordMatching = await bcrypt.compare(pass, user.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const payload = { sub: user.id, email: user.email, isAdmin: user.isAdmin };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
