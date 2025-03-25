import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsNotEmpty({ message: 'O nome do time deve ser informado.' })
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  stadium: string;

  @IsNotEmpty({ message: 'A localização do time deve ser informada.' })
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  foundationDate: string;

  @IsOptional()
  @IsInt()
  managerId: number;
}
