import { ApiProperty } from '@nestjs/swagger';
import { ExamListenQuestion } from '../../exam-listen-questions/domain/exam-listen-question';

export class ExamListenAnswer {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  examListenQuestion: ExamListenQuestion;

  @ApiProperty()
  answer: string;

  @ApiProperty()
  isCorrect: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
