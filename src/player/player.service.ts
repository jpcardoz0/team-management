import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Player } from 'src/entities/player.entity';
import { CreatePlayerDto } from './dto/CreatePlayer.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player) private playerRepository: Repository<Player>,
  ) {}

  async getAllPlayers(): Promise<Player[]> {
    const players = await this.playerRepository.find();
    return players;
  }

  async getPlayer(playerId: number): Promise<Player[]> {
    const player = await this.playerRepository.findBy({ id: playerId });
    return player;
  }

  async createPlayer(createPlayerDto: CreatePlayerDto) {
    const newPlayer = this.playerRepository.create({
      name: createPlayerDto.name,
      nationality: createPlayerDto.nationality,
      dob: createPlayerDto.dob,
    });

    await this.playerRepository.save(newPlayer);
    return newPlayer;
  }
}
