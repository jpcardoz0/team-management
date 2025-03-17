import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamModule } from './team/team.module';
import { ConfigModule } from '@nestjs/config';
import { PlayerModule } from './player/player.module';
import { StatisticModule } from './statistic/statistic.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TeamModule,
    PlayerModule,
    StatisticModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
