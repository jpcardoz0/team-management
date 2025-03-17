import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Param,
} from '@nestjs/common';

import { StatisticService } from './statistic.service';
import { CreateStatisticDto } from './dto/CreateStatistic.dto';
import { UpdateStatsDto } from './dto/UpdateStats.dto';

@Controller('statistics')
export class StatisticController {
  constructor(private readonly statsService: StatisticService) {}

  @Get()
  getAllStats() {
    return this.statsService.getAllStats();
  }

  @Get(':statsId')
  getStats(@Param('statsId', ParseIntPipe) statsId: number) {
    return this.statsService.getStats(statsId);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createStats(@Body() createStatsDto: CreateStatisticDto) {
    return this.statsService.createStats(createStatsDto);
  }

  @Put(':statsId')
  @UsePipes(new ValidationPipe())
  updateStats(
    @Param('statsId', ParseIntPipe) statsId: number,
    @Body() updateStatsDto: UpdateStatsDto,
  ) {
    return this.statsService.updateStats(statsId, updateStatsDto);
  }

  @Delete(':statsId')
  deleteStats(@Param('statsId', ParseIntPipe) statsId: number) {
    return this.statsService.deleteStats(statsId);
  }
}
