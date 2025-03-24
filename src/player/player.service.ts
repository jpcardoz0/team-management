import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Team } from 'src/entities/team.entity';
import { Player } from 'src/entities/player.entity';
import { Statistic } from 'src/entities/statistic.entity';
import { CreatePlayerDto } from './dto/CreatePlayer.dto';
import { UpdatePlayerDto } from './dto/UpdatePlayer.dto';
import { validateDate } from 'src/utils/dateFunctions';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Statistic) private statsRepository: Repository<Statistic>,
    @InjectRepository(Player) private playerRepository: Repository<Player>,
    @InjectRepository(Team) private teamRepository: Repository<Team>,
  ) {}

  async getAllPlayers(): Promise<Player[]> {
    const players = await this.playerRepository.find();
    return players;
  }

  async getPlayerStats(playerId: number): Promise<Player> {
    const player = await this.playerRepository.findOne({
      where: { id: playerId },
      relations: ['statistics'],
    });

    if (!player) {
      throw new NotFoundException(
        `Jogador com id ${playerId} não foi encontrado.`,
      );
    }

    return player;
  }

  async createPlayer(dto: CreatePlayerDto): Promise<Player> {
    const existingPlayer = await this.playerRepository.findOneBy({
      name: dto.name,
    });

    if (existingPlayer) {
      throw new BadRequestException(
        `Já existe um jogador com o nome ${existingPlayer.name}.`,
      );
    }

    if (!validateDate(dto.dob)) {
      throw new BadRequestException(
        'A data informada é inválida. Formato correto: YYYY-MM-DD',
      );
    }

    let playerTeam: Team | null = null;
    if (dto.teamId) {
      playerTeam = await this.teamRepository.findOne({
        where: {
          id: dto.teamId,
        },
      });

      if (!playerTeam) {
        throw new NotFoundException(
          `Time com id ${dto.teamId} não encontrado.`,
        );
      }
    }

    const newPlayer = this.playerRepository.create({
      ...dto,
      team: playerTeam,
    });

    await this.playerRepository.save(newPlayer);
    return newPlayer;
  }

  async updatePlayer(playerId: number, dto: UpdatePlayerDto): Promise<Player> {
    if (dto === undefined) {
      throw new BadRequestException('Um JSON deve ser inserido');
    }

    if (dto.name) {
      const existingPlayer = await this.playerRepository.findOneBy({
        name: dto.name,
      });

      if (
        existingPlayer &&
        existingPlayer.name === dto.name &&
        existingPlayer.id !== playerId
      ) {
        throw new BadRequestException(
          `Já existe um jogador com o nome ${existingPlayer.name}.`,
        );
      }
    }

    if (dto.dob && !validateDate(dto.dob)) {
      throw new BadRequestException(
        'A data informada é inválida. Formato correto: YYYY-MM-DD',
      );
    }

    const player = await this.playerRepository.findOneBy({ id: playerId });

    if (!player) {
      throw new NotFoundException(
        `Jogador com id ${playerId} não foi encontrado.`,
      );
    }

    if (dto.teamId) {
      const newTeam = await this.teamRepository.findOneBy({
        id: dto.teamId,
      });

      if (!newTeam) {
        throw new NotFoundException(
          `Time com id ${dto.teamId} não encontrado.`,
        );
      }

      player.team = newTeam;
    }

    Object.assign(player, dto);
    await this.playerRepository.save(player);

    return player;
  }

  async deletePlayer(playerId: number) {
    const existingPlayer = await this.playerRepository.findOneBy({
      id: playerId,
    });

    if (!existingPlayer) {
      throw new NotFoundException(
        `Jogador com id ${playerId} não foi encontrado.`,
      );
    }

    const playerStats = await this.statsRepository.findOne({
      where: { player: existingPlayer },
    });

    await this.playerRepository.delete(playerId);

    if (playerStats) {
      await this.statsRepository.delete(playerStats.id);
    }

    return {
      message: `Jogador com id ${playerId} deletado com sucesso.`,
    };
  }

  async setStatsToNull(playerId: number) {
    const statsPlayer = await this.playerRepository.findOneBy({ id: playerId });

    if (!statsPlayer) {
      throw new NotFoundException(
        `Jogador com o id ${playerId} não foi encontrado.`,
      );
    }

    const playerStats = await this.statsRepository.findOne({
      where: { player: statsPlayer },
    });

    if (playerStats) {
      await this.playerRepository.update(playerId, { statistics: null });
      await this.statsRepository.delete(playerStats);

      return {
        message: `Estatísticas do jogador com id ${playerId} foram apagadas com sucesso.`,
      };
    } else {
      return {
        message: `Jogador com id ${playerId} não tem estatísticas associadas a ele.`,
      };
    }
  }
}
