import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/CreateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  async createUser(dto: CreateUserDto) {
    const newUser = this.userRepository.create(dto);
    await this.userRepository.save(newUser);
    return newUser;
  }
}
