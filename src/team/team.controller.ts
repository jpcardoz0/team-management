import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/CreateTeam.dto';
import { UpdateTeamDto } from './dto/UpdateTeam.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@Roles(Role.ADMIN)
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Roles(Role.ADMIN, Role.MANAGER, Role.USER)
  @Get()
  getAllTeams() {
    return this.teamService.getAllTeams();
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.USER)
  @UsePipes(new ValidationPipe())
  @Get(':teamId')
  getTeamById(@Param('teamId', ParseIntPipe) teamId: number) {
    return this.teamService.getTeamPlayers(teamId);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  createTeam(@Body() dto: CreateTeamDto) {
    return this.teamService.createTeam(dto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':teamId')
  updateTeam(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Body() dto: UpdateTeamDto,
  ) {
    return this.teamService.updateTeam(teamId, dto);
  }

  @UsePipes(new ValidationPipe())
  @Delete(':teamId')
  deleteTeam(@Param('teamId', ParseIntPipe) teamId: number) {
    return this.teamService.deleteTeam(teamId);
  }
}
