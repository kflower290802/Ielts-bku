import { ApiProperty } from '@nestjs/swagger';
import { PracticeListenQuestion } from '../../practice-listen-questions/domain/practice-listen-question';

export class UpdatePracticeListenAnswerDto {
  @ApiProperty()
  question: PracticeListenQuestion;

  @ApiProperty()
  answer: string;

  @ApiProperty()
  isCorrect: boolean;

  @ApiProperty()
  id: string;
}
