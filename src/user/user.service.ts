import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  async getUserById(userId: number) {
    const user = this.userRepository.findOneBy({ id: userId });
    return user;
  }

  async createUser(dto: CreateUserDto) {
    const newUser = this.userRepository.create(dto);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async updateUser(userId: number, dto: UpdateUserDto) {
    await this.userRepository.update(userId, dto);
    const user = await this.userRepository.findOneBy({ id: userId });
    return user;
  }

  async deleteUser(userId: number) {
    return await this.userRepository.delete(userId);
  }
}
