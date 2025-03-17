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
    @InjectRepository(Statistic) private statsRepository: Repository<Statistic>,
    @InjectRepository(Player) private PlayerRepository: Repository<Player>,
  ) {}

  async getAllStats(): Promise<Statistic[]> {
    const stats = await this.statsRepository.find();

    return stats;
  }

  async getStatsById(statsId: number) {
    const stats = await this.statsRepository.findOneBy({ id: statsId });

    if (!stats) {
      throw new NotFoundException(
        `Estatísticas com id ${statsId} não foram encontradas.`,
      );
    }

    return stats;
  }

  async createStats(dto: CreateStatisticDto): Promise<Statistic> {
    const statsPlayer = await this.PlayerRepository.findOneBy({
      id: dto.playerId,
    });

    if (!statsPlayer) {
      throw new NotFoundException(
        `Jogador com id ${dto.playerId} não foi encontrado.`,
      );
    }

    const newStats = this.statsRepository.create({
      goals: dto.goals,
      assists: dto.assists,
      matches: dto.assists,
      player: statsPlayer,
    });

    await this.statsRepository.save(newStats);
    return newStats;
  }

  async updateStats(
    statsId: number,
    updateStatsDto: UpdateStatsDto,
  ): Promise<Statistic> {
    const stats = await this.statsRepository.findOneBy({
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
    await this.statsRepository.save(stats);

    return stats;
  }

  async deleteStats(statsId: number) {
    await this.statsRepository.delete(statsId);
    return {
      message: `Estatísticas com id ${statsId} deletadas com sucesso.`,
    };
  }
}
