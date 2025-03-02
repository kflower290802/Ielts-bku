import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { QuestionType } from '../../utils/types/question.type';

export class CreateExamListenQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  examListenSectionId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum([
    QuestionType.MultipleChoice,
    QuestionType.SingleChoice,
    QuestionType.TextBox,
  ])
  type: QuestionType;
}
