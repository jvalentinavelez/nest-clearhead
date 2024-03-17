import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  slug?: string;
}