import { ApiProperty } from '@nestjs/swagger';
import { PracticeReadingQuestion } from '../../practice-reading-questions/domain/practice-reading-question';

export class PracticeReadingAnswer {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  question: PracticeReadingQuestion;

  @ApiProperty()
  answer: string;

  @ApiProperty()
  isCorrect: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
