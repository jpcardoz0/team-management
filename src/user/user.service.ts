import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';

import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getUserById(req: Request, userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['team'],
    });

    if (!user) {
      throw new NotFoundException(
        `Usuário com id ${userId} não foi encontrado.`,
      );
    }

    const data = JSON.stringify(req.user);
    const jsonData = JSON.parse(data);

    if (jsonData.role === Role.MANAGER || jsonData.role === Role.USER) {
      if (user.id !== jsonData.id) {
        throw new UnauthorizedException();
      }
    }

    return user;
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    if (dto.password.length < 6) {
      throw new BadRequestException('A senha deve ter no mínimo 6 caracteres.');
    }

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

  async updateUser(
    req: Request,
    userId: number,
    dto: UpdateUserDto,
  ): Promise<User> {
    if (dto === undefined) {
      throw new BadRequestException('Um JSON deve ser inserido.');
    }

    if (dto.username) {
      const existingUser = await this.userRepository.findOneBy({
        username: dto.username,
      });

      if (
        existingUser &&
        existingUser.username === dto.username &&
        existingUser.id !== userId
      ) {
        throw new BadRequestException(
          `Já existe um usuário com o nome ${dto.username}`,
        );
      }
    }

    if (dto.password) {
      if (dto.password.length < 6) {
        throw new BadRequestException(
          'A senha deve ter no mínimo 6 caracteres',
        );
      }
      dto.password = encodePassword(dto.password);
    }

    await this.userRepository.update(userId, dto);

    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(
        `Usuaŕio com id ${userId} não foi encontrado.`,
      );
    }

    const data = JSON.stringify(req.user);
    const jsonData = JSON.parse(data);

    if (jsonData.role === Role.MANAGER || jsonData.role === Role.USER) {
      if (user.id !== jsonData.id) {
        throw new UnauthorizedException();
      }
    }

    return user;
  }

  async deleteUser(req: Request, userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(
        `Usuário com id ${userId} não foi encontrado.`,
      );
    }

    const data = JSON.stringify(req.user);
    const jsonData = JSON.parse(data);

    if (jsonData.role === Role.MANAGER || jsonData.role === Role.USER) {
      if (user.id !== jsonData.id) {
        throw new UnauthorizedException();
      }
    }

    await this.userRepository.delete(userId);

    return {
      message: `Usuário com id ${userId} foi deletado com sucesso.`,
    };
  }
}
