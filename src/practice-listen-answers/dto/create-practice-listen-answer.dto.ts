import { ApiProperty } from '@nestjs/swagger';
import { PracticeListenQuestion } from '../../practice-listen-questions/domain/practice-listen-question';

export class CreatePracticeListenAnswerDto {
  @ApiProperty()
  question: PracticeListenQuestion;

  @ApiProperty()
  answer: string;

  @ApiProperty()
  isCorrect: boolean;
}
