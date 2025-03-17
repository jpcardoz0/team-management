import { IsInt, IsOptional } from 'class-validator';

export class UpdateStatsDto {
  @IsInt()
  @IsOptional()
  goals: number;

  @IsInt()
  @IsOptional()
  assists: number;

  @IsInt()
  @IsOptional()
  matches: number;

  @IsInt()
  @IsOptional()
  playerId: number;
}
