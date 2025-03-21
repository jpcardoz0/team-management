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
import { UpdateTeamDto } from './dto/UpdateTeam.dto';
<<<<<<< Updated upstream

=======
//import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@UseGuards(RolesGuard)
>>>>>>> Stashed changes
@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  getAllTeams() {
    return this.teamService.getAllTeams();
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Get(':teamId')
  @UsePipes(new ValidationPipe())
  getTeamById(@Param('teamId', ParseIntPipe) teamId: number) {
    return this.teamService.getTeamById(teamId);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createTeam(@Body() dto: CreateTeamDto) {
    return this.teamService.createTeam(dto);
  }

  @Put(':teamId')
  @UsePipes(new ValidationPipe())
  updateTeam(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Body() dto: UpdateTeamDto,
  ) {
    return this.teamService.updateTeam(teamId, dto);
  }

  @Delete(':teamId')
  @UsePipes(new ValidationPipe())
  deleteTeam(@Param('teamId', ParseIntPipe) teamId: number) {
    return this.teamService.deleteTeam(teamId);
  }
}
