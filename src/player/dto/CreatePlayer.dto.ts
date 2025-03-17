import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty({ message: 'O nome do jogador deve ser informado.' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'A nacionalidade do jogador deve ser informada.' })
  @IsString()
  nationality: string;

  @IsNotEmpty({ message: 'A posição do jogador deve ser informada.' })
  @IsString()
  position: string;

  @IsNotEmpty({
    message: 'A data de nascimento do jogador deve ser informada.',
  })
  @IsString()
  dob: string;

  @IsOptional()
  @IsInt()
  teamId: number;
}
