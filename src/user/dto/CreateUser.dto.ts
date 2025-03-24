import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome de usuário deve ser informado.' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'A senha deve ser informada.' })
  @IsString()
  password: string;

  @IsOptional()
  @IsIn([Role.ADMIN, Role.MANAGER, Role.USER])
  role: Role;
}
