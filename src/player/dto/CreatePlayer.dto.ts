import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome do jogador deve ser informado.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'A nacionalidade do jogador deve ser informada.' })
  nationality: string;

  @IsString()
  @IsNotEmpty({
    message: 'A data de nascimento do jogador deve ser informada.',
  })
  dob: string;
}
