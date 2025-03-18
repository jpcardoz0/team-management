import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome de usuário deve ser informado.' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'A senha deve ser informada.' })
  @IsString()
  password: string;
}
