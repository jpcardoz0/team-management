import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Team } from 'src/entities/team.entity';
import { User } from 'src/entities/user.entity';
import { CreateTeamDto } from './dto/CreateTeam.dto';
import { UpdateTeamDto } from './dto/UpdateTeam.dto';
import { validateDate } from 'src/utils/dateFunctions';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Team) private teamRepository: Repository<Team>,
  ) {}

  async getAllTeams(): Promise<Team[]> {
    const teams = await this.teamRepository.find();
    return teams;
  }

  async getTeamPlayers(teamId: number): Promise<Team> {
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
      throw new BadRequestException(`Já existe um time com o nome ${dto.name}`);
    }

    const newTeam = this.teamRepository.create(dto);

    if (dto.foundationDate && !validateDate(dto.foundationDate)) {
      throw new BadRequestException(
        'A data informada é inválida. Formato correto: YYYY-MM-DD',
      );
    }

    if (dto.managerId) {
      const manager = await this.userRepository.findOneBy({
        id: dto.managerId,
      });

      if (!manager) {
        throw new NotFoundException(
          `Usuário com id ${dto.managerId} não foi encontrado.`,
        );
      }

      if (manager.role !== Role.MANAGER) {
        throw new BadRequestException(
          `Usuário com id ${dto.managerId} não é um manager.`,
        );
      }

      newTeam.manager = manager;
    }

    await this.teamRepository.save(newTeam);
    return newTeam;
  }

  async updateTeam(teamId: number, dto: UpdateTeamDto): Promise<Team> {
    if (dto === undefined) {
      throw new BadRequestException('Um JSON deve ser inserido.');
    }

    if (dto.name) {
      const existingTeam = await this.teamRepository.findOneBy({
        name: dto.name,
      });

      if (
        existingTeam &&
        existingTeam.name === dto.name &&
        existingTeam.id !== teamId
      ) {
        throw new BadRequestException(
          `Já existe um time com o nome ${dto.name}`,
        );
      }
    }

    if (dto.foundationDate && !validateDate(dto.foundationDate)) {
      throw new BadRequestException(
        'A data informada é inválida. Formato correto: YYYY-MM-DD',
      );
    }

    const team = await this.teamRepository.findOneBy({ id: teamId });

    if (!team) {
      throw new NotFoundException(`Time com id ${teamId} não foi encontrado.`);
    }

    if (dto.managerId) {
      const manager = await this.userRepository.findOneBy({
        id: dto.managerId,
      });

      if (!manager) {
        throw new NotFoundException(
          `Usuário com id ${dto.managerId} não foi encontrado.`,
        );
      }

      if (manager.role !== Role.MANAGER) {
        throw new BadRequestException(
          `Usuário com id ${dto.managerId} não é um manager.`,
        );
      }

      team.manager = manager;
    }

    Object.assign(team, dto);
    await this.teamRepository.save(team);

    return team;
  }

  async deleteTeam(teamId: number) {
    const team = await this.teamRepository.findOneBy({ id: teamId });

    if (!team) {
      throw new NotFoundException(`Time com id ${teamId} não foi encontrado.`);
    }

    await this.teamRepository.delete(teamId);

    return {
      message: `Time com id ${teamId} foi deletado com suceso.`,
    };
  }
}
