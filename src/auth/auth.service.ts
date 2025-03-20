import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/entities/user.entity';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async validateUser(dto: AuthDto) {
    const findUser = await this.userRepository.findOneBy({
      username: dto.username,
    });

    if (!findUser) {
      throw new HttpException('Usuário não encontrado.', 401);
    }

    if (dto.password === findUser.password) {
      const { ...user } = findUser;
      return this.jwtService.sign(user);
    }
  }
}
