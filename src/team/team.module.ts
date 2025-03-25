import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { Team } from 'src/entities/team.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, User])],
  providers: [TeamService],
  controllers: [TeamController],
})
export class TeamModule {}
