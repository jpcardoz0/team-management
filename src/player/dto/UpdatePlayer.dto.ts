import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdatePlayerDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  nationality: string;

  @IsOptional()
  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  dob: string;

  @IsOptional()
  @IsInt()
  teamId: number;
}
