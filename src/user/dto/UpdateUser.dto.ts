import { IsIn, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsIn([Role.ADMIN, Role.MANAGER, Role.USER])
  role: Role;
}
