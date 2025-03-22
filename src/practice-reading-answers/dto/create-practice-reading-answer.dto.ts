import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { PracticeReadingQuestion } from '../../practice-reading-questions/domain/practice-reading-question';

export class CreatePracticeReadingAnswerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  question: PracticeReadingQuestion;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  answer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isCorrect: boolean;
}
