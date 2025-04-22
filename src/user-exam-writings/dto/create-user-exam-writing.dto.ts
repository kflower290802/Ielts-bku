import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserExamWritingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  examId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  examWritingId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  answer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  taskResponse?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  taskResponseDetails?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  coherenceAndCohesion?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  coherenceAndCohesionDetails?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  lexicalResource?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  lexicalResourceDetails?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  grammaticalRangeAndAccuracy?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  grammaticalRangeAndAccuracyDetails?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  overallBandScore?: number;
}
