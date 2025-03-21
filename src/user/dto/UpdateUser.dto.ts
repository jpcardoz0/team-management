import { IsInt, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  role: Role;

  @IsOptional()
  @IsInt()
  teamId: number;
}
