import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Roles(Role.ADMIN)
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.USER)
  @UsePipes(new ValidationPipe())
  @Get(':userId')
  getUserById(
    @Req() req: Request,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.userService.getUserById(req, userId);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.USER)
  @UsePipes(new ValidationPipe())
  @Put(':userId')
  updateUser(
    @Req() req: Request,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.updateUser(req, userId, dto);
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.USER)
  @UsePipes(new ValidationPipe())
  @Delete(':userId')
  deleteUser(
    @Req() req: Request,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.userService.deleteUser(req, userId);
  }
}
