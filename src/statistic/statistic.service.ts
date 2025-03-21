import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async createStats(dto: CreateStatisticDto): Promise<Statistic> {
    const statsPlayer = await this.PlayerRepository.findOneBy({
      id: dto.playerId,
    });

    if (!statsPlayer) {
      throw new NotFoundException(
        `Jogador com id ${dto.playerId} não foi encontrado.`,
      );
    }

    const stats = await this.statsRepository.findOne({
      where: { player: statsPlayer },
    });

    if (stats) {
      throw new BadRequestException(
        `Jogador com id ${dto.playerId} já tem estatísticas associadas a ele.`,
      );
    }

    const newStats = this.statsRepository.create({
      ...dto,
      player: statsPlayer,
    });

    await this.statsRepository.save(newStats);
    return newStats;
  }

  async updateStats(statsId: number, dto: UpdateStatsDto): Promise<Statistic> {
    if (dto === undefined) {
      throw new BadRequestException('Um JSON deve ser inserido.');
    }

    const stats = await this.statsRepository.findOneBy({
      id: statsId,
    });

    if (!stats) {
      throw new NotFoundException('Essas estatísticas não existem.');
    }

    if (dto.playerId) {
      const newPlayer = await this.PlayerRepository.findOneBy({
        id: dto.playerId,
      });

      if (!newPlayer) {
        throw new NotFoundException(
          `Jogador com id ${dto.playerId} não encontrado.`,
        );
      }

      stats.player = newPlayer;
    }

    Object.assign(stats, dto);
    await this.statsRepository.save(stats);

    return stats;
  }
}
