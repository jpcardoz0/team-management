import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Statistic } from 'src/entities/statistic.entity';
import { Player } from 'src/entities/player.entity';
import { Team } from 'src/entities/team.entity';
import { CreateStatisticDto } from './dto/CreateStatistic.dto';
import { UpdateStatsDto } from './dto/UpdateStats.dto';
import { Request } from 'express';

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Statistic) private statsRepository: Repository<Statistic>,
    @InjectRepository(Player) private playerRepository: Repository<Player>,
    @InjectRepository(Team) private teamRepository: Repository<Team>,
  ) {}

  async createStats(req: Request, dto: CreateStatisticDto): Promise<Statistic> {
    const statsPlayer = await this.playerRepository.findOneBy({
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

    const team = await this.teamRepository.findOne({
      where: { players: statsPlayer },
      relations: ['manager'],
    });

    if (team && team.manager) {
      const user = JSON.stringify(req.user);
      const jsonData = JSON.parse(user);

      if (jsonData.id !== team.manager.id) {
        throw new UnauthorizedException();
      }
    }

    const newStats = this.statsRepository.create({
      ...dto,
      player: statsPlayer,
    });

    await this.statsRepository.save(newStats);
    return newStats;
  }

  async updateStats(
    req: Request,
    statsId: number,
    dto: UpdateStatsDto,
  ): Promise<Statistic> {
    if (dto === undefined) {
      throw new BadRequestException('Um JSON deve ser inserido.');
    }

    const stats = await this.statsRepository.findOneBy({
      id: statsId,
    });

    if (!stats) {
      throw new NotFoundException('Essas estatísticas não existem.');
    }

    const newPlayer = await this.playerRepository.findOneBy({
      id: dto.playerId,
    });

    if (dto.playerId) {
      if (!newPlayer) {
        throw new NotFoundException(
          `Jogador com id ${dto.playerId} não encontrado.`,
        );
      }

      stats.player = newPlayer;
    }

    const team = await this.teamRepository.findOne({
      where: { players: stats.player },
      relations: ['manager'],
    });

    if (team && team.manager) {
      const user = JSON.stringify(req.user);
      const jsonData = JSON.parse(user);

      if (jsonData.id !== team.manager.id) {
        throw new UnauthorizedException();
      }
    }

    Object.assign(stats, dto);
    await this.statsRepository.save(stats);

    return stats;
  }
}
