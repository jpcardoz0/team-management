import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Team } from 'src/entities/team.entity';
import { CreateTeamDto } from './dto/CreateTeam.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private teamRepository: Repository<Team>,
  ) {}

  async getAllTeams() {
    const teams = await this.teamRepository.find();
    return teams;
  }

  async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
    const newTeam = this.teamRepository.create({
      name: createTeamDto.name,
      stadium: createTeamDto.stadium,
      location: createTeamDto.location,
      foundationDate: createTeamDto.foundationDate,
    });

    await this.teamRepository.save(newTeam);
    return newTeam;
  }
}
