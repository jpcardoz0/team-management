import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { Statistic } from 'src/entities/statistic.entity';
import { Player } from 'src/entities/player.entity';
import { Team } from 'src/entities/team.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Statistic, Player, Team, User])],
  providers: [PlayerService],
  controllers: [PlayerController],
})
export class PlayerModule {}
