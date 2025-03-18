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
  getPlayerById(@Param('playerId', ParseIntPipe) playerId: number) {
    return this.playerService.getPlayerById(playerId);
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

  @Delete(':playerId')
  @UsePipes(new ValidationPipe())
  deletePlayer(@Param('playerId', ParseIntPipe) playerId: number) {
    return this.playerService.deletePlayer(playerId);
  }
}
