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

  @Post()
  createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.createPlayer(createPlayerDto);
  }

  @Put(':pĺayerId')
  updatePlayer() {}

  @Delete(':playerId')
  deletePlayer() {}
}
