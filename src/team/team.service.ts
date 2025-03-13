import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Team } from 'src/entities/team.entity';
import { CreateTeamDto } from './dto/CreateTeam.dto';
import { updateTeamDto } from './dto/UpdateTeam.dto';
import { validateDate } from 'src/utils/dateFunctions';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private teamRepository: Repository<Team>,
  ) {}

  async getAllTeams() {
    const teams = await this.teamRepository.find();
    return teams;
  }

  async getTeam(teamId: number) {
    const team = await this.teamRepository.findBy({ id: teamId });
    return team;
  }

  async createTeam(createTeamDto: CreateTeamDto): Promise<Team> {
    const newTeam = this.teamRepository.create({
      name: createTeamDto.name,
      stadium: createTeamDto.stadium,
      location: createTeamDto.location,
      foundationDate: createTeamDto.foundationDate,
    });

    if (!validateDate(createTeamDto.foundationDate)) {
      throw new BadRequestException('A data informada é inválida.');
    }

    await this.teamRepository.save(newTeam);
    return newTeam;
  }

  async updateTeam(
    teamId: number,
    updateTeamDto: updateTeamDto,
  ): Promise<Team> {
    await this.teamRepository.update(teamId, updateTeamDto);
    const team = await this.teamRepository.findOne({ where: { id: teamId } });
    if (!team) {
      throw new NotFoundException('Time não encontrado.');
    }
    return team;
  }

  async deleteTeam(teamId: number): Promise<void> {
    await this.teamRepository.delete(teamId);
  }
}
