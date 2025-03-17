import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateStatisticDto {
  @IsNotEmpty({ message: 'O número de gols deve ser informado.' })
  @IsInt()
  goals: number;

  @IsNotEmpty({ message: 'O número de assistências deve ser informado.' })
  @IsInt()
  assists: number;

  @IsNotEmpty({ message: 'O número de partidas deve ser informado.' })
  @IsInt()
  matches: number;

  @IsNotEmpty({ message: 'O ID do jogador deve ser informado.' })
  @IsInt()
  playerId: number;
}
