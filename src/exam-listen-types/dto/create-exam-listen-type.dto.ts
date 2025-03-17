import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { QuestionType } from '../../utils/types/question.type';

export class CreateExamListenTypeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  examSectionId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Object.values(QuestionType))
  type: QuestionType;

  @ApiProperty()
  @IsOptional()
  @IsString()
  content?: string;
}
