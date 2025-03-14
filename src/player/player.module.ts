import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { Player } from 'src/entities/player.entity';
import { Team } from 'src/entities/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player, Team])],
  providers: [PlayerService],
  controllers: [PlayerController],
})
export class PlayerModule {}
