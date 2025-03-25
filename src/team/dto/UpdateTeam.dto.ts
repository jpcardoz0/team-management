import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateTeamDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  stadium: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  foundationDate: string;

  @IsOptional()
  @IsInt()
  managerId: number;
}
