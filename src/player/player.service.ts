import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Team } from 'src/entities/team.entity';
import { Player } from 'src/entities/player.entity';
import { CreatePlayerDto } from './dto/CreatePlayer.dto';
import { UpdatePlayerDto } from './dto/UpdatePlayer.dto';
import { validateDate } from 'src/utils/dateFunctions';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
    @InjectRepository(Team) private teamRepository: Repository<Team>,
  ) {}

  async getAllPlayers(): Promise<Player[]> {
    const players = await this.playerRepository.find({
      relations: ['statistics'],
    });

    return players;
  }

  async getPlayerById(playerId: number): Promise<Player> {
    const player = await this.playerRepository.findOne({
      where: { id: playerId },
      relations: ['statistics'],
    });

    if (!player) {
      throw new NotFoundException(`Jogador com id ${playerId} não encontrado.`);
    }

    return player;
  }

  async createPlayer(dto: CreatePlayerDto): Promise<Player> {
    const existingPlayer = await this.playerRepository.findOneBy({
      name: dto.name,
    });

    if (existingPlayer) {
      throw new BadRequestException(
        `O jogador ${existingPlayer.name} já existe.`,
      );
    }

    if (!validateDate(dto.dob)) {
      throw new BadRequestException(
        'A data informada é inválida. Formato correto: YYYY-MM-DD',
      );
    }

    let playerTeam = await this.teamRepository.findOne({
      where: {
        id: dto.teamId,
      },
    });

    if (!playerTeam) {
      throw new NotFoundException(`Time com id ${dto.teamId} não encontrado.`);
    }

    if (!dto.teamId) {
      playerTeam = null;
    }

    const newPlayer = this.playerRepository.create({
      name: dto.name,
      nationality: dto.nationality,
      dob: dto.dob,
      position: dto.position,
      team: playerTeam,
    });

    await this.playerRepository.save(newPlayer);
    return newPlayer;
  }

  async updatePlayer(playerId: number, dto: UpdatePlayerDto): Promise<Player> {
    if (dto.name) {
      const existingPlayer = await this.playerRepository.findOneBy({
        name: dto.name,
      });

      if (existingPlayer) {
        throw new BadRequestException(
          `O jogador ${existingPlayer.name} já existe.`,
        );
      }
    }

    if (dto.dob) {
      if (!validateDate(dto.dob)) {
        throw new BadRequestException(
          'A data informada é inválida. Formato correto: YYYY-MM-DD',
        );
      }
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

    await this.playerRepository.delete(playerId);

    return {
      message: `Jogador com id ${playerId} deletado com sucesso.`,
    };
  }
}
