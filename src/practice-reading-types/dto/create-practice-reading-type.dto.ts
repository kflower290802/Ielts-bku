import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';
import { QuestionType } from '../../utils/types/question.type';

export class CreatePracticeReadingTypeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  practiceReadingId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Object.values(QuestionType))
  type: QuestionType;
}
