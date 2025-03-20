import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(
        `Usuário com id ${userId} não foi encontrado.`,
      );
    }

    return user;
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({
      username: dto.username,
    });

    if (existingUser) {
      throw new BadRequestException(
        `Já existe um usuário com o nome ${dto.username}.`,
      );
    }

    const password = encodePassword(dto.password);
    const newUser = this.userRepository.create({ ...dto, password });

    await this.userRepository.save(newUser);

    return newUser;
  }

  async updateUser(userId: number, dto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({
      username: dto.username,
    });

    if (existingUser) {
      throw new BadRequestException(
        `Já existe um usuário com o nome ${dto.username}.`,
      );
    }

    await this.userRepository.update(userId, dto);
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(
        `Usuaŕio com id ${userId} não foi encontrado.`,
      );
    }

    return user;
  }

  async deleteUser(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(
        `Usuário com id ${userId} não foi encontrado.`,
      );
    }

    await this.userRepository.delete(userId);

    return {
      message: `Usuário com id ${userId} foi deletado com sucesso.`,
    };
  }
}
