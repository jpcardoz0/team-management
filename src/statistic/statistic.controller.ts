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
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { StatisticService } from './statistic.service';
import { CreateStatisticDto } from './dto/CreateStatistic.dto';
import { UpdateStatsDto } from './dto/UpdateStats.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

@Roles(Role.ADMIN, Role.MANAGER)
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller('statistic')
export class StatisticController {
  constructor(private readonly statsService: StatisticService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createStats(@Req() req: Request, @Body() dto: CreateStatisticDto) {
    return this.statsService.createStats(req, dto);
  }

  @Put(':statsId')
  @UsePipes(new ValidationPipe())
  updateStats(
    @Req() req: Request,
    @Param('statsId', ParseIntPipe) statsId: number,
    @Body() dto: UpdateStatsDto,
  ) {
    return this.statsService.updateStats(req, statsId, dto);
  }
}
