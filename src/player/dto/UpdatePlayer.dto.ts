import { IsInt, IsOptional, IsString, Min } from 'class-validator';

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
  @Min(1)
  teamId: number;
}
