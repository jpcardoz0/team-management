import {
  Controller,
  Get,
  Post,
  Body,
  //Param,
  UsePipes,
  ValidationPipe,
  //ParseIntPipe,
} from '@nestjs/common';

import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/CreateTeam.dto';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  getAllTeams() {
    return this.teamService.getAllTeams();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createTeam(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.createTeam(createTeamDto);
  }
}
