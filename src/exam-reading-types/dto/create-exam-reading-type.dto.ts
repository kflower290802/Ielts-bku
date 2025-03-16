import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { QuestionType } from '../../utils/types/question.type';

export class CreateExamReadingTypeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  examPassageId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Object.values(QuestionType))
  type: QuestionType;

  @ApiProperty()
  @IsString()
  @IsOptional()
  content?: string;
}
