import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Statistic } from 'src/entities/statistic.entity';
import { CreateStatisticDto } from './dto/CreateStatistic.dto';
import { UpdateStatsDto } from './dto/UpdateStats.dto';
import { Player } from 'src/entities/player.entity';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Statistic) private StatsRepository: Repository<Statistic>,
    @InjectRepository(Player) private PlayerRepository: Repository<Player>,
  ) {}

  async getAllStats(): Promise<Statistic[]> {
    const stats = await this.StatsRepository.find();

    return stats;
  }

  async getStats(statsId: number) {
    const stats = await this.StatsRepository.findOneBy({ id: statsId });

    if (!stats) {
      throw new NotFoundException(
        `Estatísticas com id ${statsId} não foram encontradas.`,
      );
    }

    return stats;
  }

  async createStats(createStatsDto: CreateStatisticDto): Promise<Statistic> {
    const statsPlayer = await this.PlayerRepository.findOneBy({
      id: createStatsDto.playerId,
    });

    if (!statsPlayer) {
      throw new NotFoundException(
        `Jogador com id ${createStatsDto.playerId} não foi encontrado.`,
      );
    }

    const newStats = this.StatsRepository.create({
      goals: createStatsDto.goals,
      assists: createStatsDto.assists,
      matches: createStatsDto.assists,
      player: statsPlayer,
    });

    await this.StatsRepository.save(newStats);
    return newStats;
  }

  async updateStats(
    statsId: number,
    updateStatsDto: UpdateStatsDto,
  ): Promise<Statistic> {
    const stats = await this.StatsRepository.findOneBy({
      id: statsId,
    });

    if (!stats) {
      throw new NotFoundException('Essas estatísticas não existem.');
    }

    if (updateStatsDto.playerId) {
      const newPlayer = await this.PlayerRepository.findOneBy({
        id: updateStatsDto.playerId,
      });

      if (!newPlayer) {
        throw new NotFoundException(
          `Jogador com id ${updateStatsDto.playerId} não encontrado.`,
        );
      }

      stats.player = newPlayer;
    }
    Object.assign(stats, updateStatsDto);
    await this.StatsRepository.save(stats);

    return stats;
  }

  async deleteStats(statsId: number) {
    await this.StatsRepository.delete(statsId);
    return {
      message: `Estatísticas com id ${statsId} deletadas com sucesso.`,
    };
  }
}
