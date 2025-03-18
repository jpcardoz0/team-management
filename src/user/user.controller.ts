import { Body, Controller, Get, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }
}
