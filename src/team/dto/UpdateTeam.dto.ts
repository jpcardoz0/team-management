import { IsOptional, IsString } from 'class-validator';

export class UpdateTeamDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  stadium: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  foundationDate: string;
}
