import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { TeamModule } from 'src/team/team.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TeamModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
