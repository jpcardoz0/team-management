import {
  Body,
  Controller,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Param,
  UseGuards,
} from '@nestjs/common';

import { StatisticService } from './statistic.service';
import { CreateStatisticDto } from './dto/CreateStatistic.dto';
import { UpdateStatsDto } from './dto/UpdateStats.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('statistics')
export class StatisticController {
  constructor(private readonly statsService: StatisticService) {}

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
}
