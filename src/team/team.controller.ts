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
} from '@nestjs/common';

import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/CreateTeam.dto';
import { updateTeamDto } from './dto/UpdateTeam.dto';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  getAllTeams() {
    return this.teamService.getAllTeams();
  }

  @Get(':teamId')
  @UsePipes(new ValidationPipe())
  getTeam(@Param('teamId', ParseIntPipe) teamId: number) {
    return this.teamService.getTeam(teamId);
  }

  @Post()
  createTeam(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.createTeam(createTeamDto);
  }

  @Put(':teamId')
  @UsePipes(new ValidationPipe())
  updateTeam(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Body() updateTeamDto: updateTeamDto,
  ) {
    return this.teamService.updateTeam(teamId, updateTeamDto);
  }

  @Delete(':teamId')
  @UsePipes(new ValidationPipe())
  deleteTeam(@Param('teamId', ParseIntPipe) teamId: number) {
    return this.teamService.deleteTeam(teamId);
  }
}
