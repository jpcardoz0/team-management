import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':userId')
  @UsePipes(new ValidationPipe())
  getUserById(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getUserById(userId);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Put(':userId')
  @UsePipes(new ValidationPipe())
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, dto);
  }

  @Delete(':userId')
  @UsePipes(new ValidationPipe())
  deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.deleteUser(userId);
  }
}
