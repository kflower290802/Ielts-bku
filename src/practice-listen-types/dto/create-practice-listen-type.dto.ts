import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '../../utils/types/question.type';
import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';

export class CreatePracticeListenTypeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Object.values(QuestionType))
  type: QuestionType;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  practiceListenId: string;
}
