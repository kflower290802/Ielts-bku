import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserPracticeDto } from './create-user-practice.dto';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserPracticeDto extends PartialType(CreateUserPracticeDto) {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isCompleted: boolean;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  score?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  taskResponse?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  taskResponseDetails?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  coherenceAndCohesion?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  coherenceAndCohesionDetails?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  lexicalResource?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  lexicalResourceDetails?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  grammaticalRangeAndAccuracy?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  grammaticalRangeAndAccuracyDetails?: string;
}
