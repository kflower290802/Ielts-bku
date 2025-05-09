import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { QuestionType } from '../../utils/types/question.type';

export class UpdateExamListenTypeDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum(Object.values(QuestionType))
  type: QuestionType;

  @ApiProperty()
  @IsOptional()
  @IsString()
  content?: string;
}
