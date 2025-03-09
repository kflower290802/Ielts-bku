import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { QuestionType } from '../../utils/types/question.type';

export class CreateExamPassageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  examId: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @MinLength(1)
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type: QuestionType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  passage: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  blankPassage?: string;
}
