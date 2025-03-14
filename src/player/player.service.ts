import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Team } from 'src/entities/team.entity';
import { Player } from 'src/entities/player.entity';
import { CreatePlayerDto } from './dto/CreatePlayer.dto';
import { UpdatePlayerDto } from './dto/UpdatePlayer.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
    @InjectRepository(Team) private teamRepository: Repository<Team>,
  ) {}

  async getAllPlayers(): Promise<Player[]> {
    const players = await this.playerRepository.find();
    return players;
  }

  async getPlayer(playerId: number): Promise<Player[]> {
    const player = await this.playerRepository.findBy({ id: playerId });

    if (!player) {
      throw new NotFoundException('Jogador não encontrado.');
    }

    return player;
  }

  async getPlayerByTeamId(teamId: number): Promise<Player[]> {
    const team = await this.teamRepository.findOneBy({ id: teamId });

    if (!team) {
      throw new NotFoundException('Time não encontrado.');
    }

    const players = await this.playerRepository.find({
      where: {
        team: { id: teamId },
      },
      relations: ['team'],
    });

    return players;
  }

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const playerTeam = await this.teamRepository.findOne({
      where: {
        id: createPlayerDto.teamId,
      },
    });

    if (!playerTeam) {
      throw new NotFoundException('Time não encontrado.');
    }

    const newPlayer = this.playerRepository.create({
      name: createPlayerDto.name,
      nationality: createPlayerDto.nationality,
      dob: createPlayerDto.dob,
      position: createPlayerDto.position,
      team: playerTeam,
    });

    await this.playerRepository.save(newPlayer);
    return newPlayer;
  }

  async updatePlayer(
    playerId: number,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<Player[]> {
    await this.playerRepository.update(playerId, updatePlayerDto);

    const player = await this.playerRepository.findBy({ id: playerId });
    if (!player) {
      throw new NotFoundException('Jogador não encontrado.');
    }

    return player;
  }

  async deletePlayer(playerId: number): Promise<void> {
    await this.playerRepository.delete(playerId);
  }
}
