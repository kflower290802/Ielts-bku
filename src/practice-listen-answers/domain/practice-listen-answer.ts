import { ApiProperty } from '@nestjs/swagger';
import { PracticeListenQuestion } from '../../practice-listen-questions/domain/practice-listen-question';

export class PracticeListenAnswer {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  question: PracticeListenQuestion;

  @ApiProperty()
  answer: string;

  @ApiProperty()
  isCorrect: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
