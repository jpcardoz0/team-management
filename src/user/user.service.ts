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
import { Role } from 'src/enums/role.enum';
import { Team } from 'src/entities/team.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Team) private teamRepository: Repository<Team>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['team'],
    });

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
    if (dto.username) {
      const existingUser = await this.userRepository.findOneBy({
        username: dto.username,
      });

      if (existingUser) {
        console.log(existingUser);
        throw new BadRequestException(
          `Já existe um usuário com o nome ${dto.username}.`,
        );
      }
    }

    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(
        `Usuaŕio com id ${userId} não foi encontrado.`,
      );
    }

    if (dto.password) {
      user.password = encodePassword(dto.password);
    }

    if (dto.role === Role.MANAGER) {
      if (!dto.teamId) {
        throw new BadRequestException(
          'Um manager deve estar associado a um time.',
        );
      }

      const newTeam = await this.teamRepository.findOneBy({ id: dto.teamId });

      if (!newTeam) {
        throw new NotFoundException(`
          Time com id ${dto.teamId} não foi encontrado,
        `);
      }
      user.team = newTeam;
    }

    await this.userRepository.save(user);

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
