import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Team } from 'src/entities/team.entity';
import { CreateTeamDto } from './dto/CreateTeam.dto';
import { UpdateTeamDto } from './dto/UpdateTeam.dto';
import { validateDate } from 'src/utils/dateFunctions';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private teamRepository: Repository<Team>,
  ) {}

  async getAllTeams(): Promise<Team[]> {
    const teams = await this.teamRepository.find({ relations: ['players'] });
    return teams;
  }

  async getTeamById(teamId: number): Promise<Team> {
    const team = await this.teamRepository.findOne({
      where: { id: teamId },
      relations: ['players'],
    });

    if (!team) {
      throw new NotFoundException(`Time com id ${teamId} não foi encontrado.`);
    }

    return team;
  }

  async createTeam(dto: CreateTeamDto): Promise<Team> {
    const existingTeam = await this.teamRepository.findOne({
      where: { name: dto.name },
    });

    if (existingTeam) {
      throw new BadRequestException(`${dto.name} já foi criado.`);
    }

    const newTeam = this.teamRepository.create(dto);

    if (dto.foundationDate) {
      if (!validateDate(dto.foundationDate)) {
        throw new BadRequestException(
          'A data informada é inválida. Formato correto: YYYY-MM-DD',
        );
      }
    }

    await this.teamRepository.save(newTeam);
    return newTeam;
  }

  async updateTeam(teamId: number, dto: UpdateTeamDto): Promise<Team> {
    if (dto.name) {
      const existingTeam = await this.teamRepository.findOneBy({
        name: dto.name,
      });

      if (existingTeam) {
        throw new BadRequestException(`${dto.name} já foi criado.`);
      }
    }

    if (dto.foundationDate) {
      if (!validateDate(dto.foundationDate)) {
        throw new BadRequestException(
          'A data informada é inválida. Formato correto: YYYY-MM-DD',
        );
      }
    }

    const team = await this.teamRepository.findOneBy({ id: teamId });

    if (!team) {
      throw new NotFoundException(`Time com id ${teamId} não foi encontrado.`);
    }

    Object.assign(team, dto);
    await this.teamRepository.save(team);

    return team;
  }

  async deleteTeam(teamId: number) {
    const existingTeam = await this.teamRepository.findOneBy({ id: teamId });

    if (!existingTeam) {
      throw new NotFoundException(`Time com id ${teamId} não foi encontrado.`);
    }

    await this.teamRepository.delete(teamId);

    return {
      message: `Time com id ${teamId} foi deletado com suceso.`,
    };
  }
}
