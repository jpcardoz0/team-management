import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';
import { Statistic } from 'src/entities/statistic.entity';
import { Player } from 'src/entities/player.entity';
import { Team } from 'src/entities/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Statistic, Player, Team])],
  providers: [StatisticService],
  controllers: [StatisticController],
})
export class StatisticModule {}
