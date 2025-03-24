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
  createPlayer(@Body() dto: CreatePlayerDto) {
    return this.playerService.createPlayer(dto);
  }

  @Put(':playerId')
  @UsePipes(new ValidationPipe())
  updatePlayer(
    @Param('playerId', ParseIntPipe) playerId: number,
    @Body() dto: UpdatePlayerDto,
  ) {
    return this.playerService.updatePlayer(playerId, dto);
  }

  @Put(':playerId/deleteStats')
  @UsePipes(new ValidationPipe())
  setStatsToNull(@Param('playerId', ParseIntPipe) playerId: number) {
    return this.playerService.setStatsToNull(playerId);
  }

  @Delete(':playerId')
  @UsePipes(new ValidationPipe())
  deletePlayer(@Param('playerId', ParseIntPipe) playerId: number) {
    return this.playerService.deletePlayer(playerId);
  }
}
