import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { Team } from 'src/entities/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  providers: [TeamService],
  controllers: [TeamController],
  exports: [TypeOrmModule],
})
export class TeamModule {}
