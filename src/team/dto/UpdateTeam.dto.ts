import { IsOptional, IsString } from 'class-validator';

export class updateTeamDto {
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
