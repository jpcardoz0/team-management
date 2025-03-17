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
  @UsePipes(new ValidationPipe())
  getStatsById(@Param('statsId', ParseIntPipe) statsId: number) {
    return this.statsService.getStatsById(statsId);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createStats(@Body() dto: CreateStatisticDto) {
    return this.statsService.createStats(dto);
  }

  @Put(':statsId')
  @UsePipes(new ValidationPipe())
  updateStats(
    @Param('statsId', ParseIntPipe) statsId: number,
    @Body() dto: UpdateStatsDto,
  ) {
    return this.statsService.updateStats(statsId, dto);
  }

  @Delete(':statsId')
  deleteStats(@Param('statsId', ParseIntPipe) statsId: number) {
    return this.statsService.deleteStats(statsId);
  }
}
