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
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/CreatePlayer.dto';
import { UpdatePlayerDto } from './dto/UpdatePlayer.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Roles(Role.ADMIN, Role.MANAGER)
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Roles(Role.ADMIN, Role.MANAGER, Role.USER)
  @Get()
  getAllPlayers() {
    return this.playerService.getAllPlayers();
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.USER)
  @Get(':playerId')
  @UsePipes(new ValidationPipe())
  getPlayerStats(@Param('playerId', ParseIntPipe) playerId: number) {
    return this.playerService.getPlayerStats(playerId);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createPlayer(@Req() req: Request, @Body() dto: CreatePlayerDto) {
    return this.playerService.createPlayer(req, dto);
  }

  @Put(':playerId')
  @UsePipes(new ValidationPipe())
  updatePlayer(
    @Req() req: Request,
    @Param('playerId', ParseIntPipe) playerId: number,
    @Body() dto: UpdatePlayerDto,
  ) {
    return this.playerService.updatePlayer(req, playerId, dto);
  }

  @Put(':playerId/deleteStats')
  @UsePipes(new ValidationPipe())
  setStatsToNull(
    @Req() req: Request,
    @Param('playerId', ParseIntPipe) playerId: number,
  ) {
    return this.playerService.setStatsToNull(req, playerId);
  }

  @Delete(':playerId')
  @UsePipes(new ValidationPipe())
  deletePlayer(
    @Req() req: Request,
    @Param('playerId', ParseIntPipe) playerId: number,
  ) {
    return this.playerService.deletePlayer(req, playerId);
  }
}
