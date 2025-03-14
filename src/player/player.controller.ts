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

import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/CreatePlayer.dto';
import { UpdatePlayerDto } from './dto/UpdatePlayer.dto';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  getAllPlayers() {
    return this.playerService.getAllPlayers();
  }

  @Get(':playerId')
  @UsePipes(new ValidationPipe())
  getPlayer(@Param('playerId', ParseIntPipe) playerId: number) {
    return this.playerService.getPlayer(playerId);
  }

  @Get('teams/:teamId')
  @UsePipes(new ValidationPipe())
  getPlayerByTeamId(@Param('teamId', ParseIntPipe) teamId: number) {
    return this.playerService.getPlayerByTeamId(teamId);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.createPlayer(createPlayerDto);
  }

  @Put(':playerId')
  @UsePipes(new ValidationPipe())
  updatePlayer(
    @Param('playerId', ParseIntPipe) playerId: number,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ) {
    return this.playerService.updatePlayer(playerId, updatePlayerDto);
  }

  @Delete(':playerId')
  deletePlayer(@Param('playerId', ParseIntPipe) playerId: number) {
    return this.playerService.deletePlayer(playerId);
  }
}
