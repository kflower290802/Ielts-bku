import { ApiProperty } from '@nestjs/swagger';
import { ExamPassageQuestion } from '../../exam-passage-questions/domain/exam-passage-question';

export class ExamPassageAnswer {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  question: ExamPassageQuestion;

  @ApiProperty()
  answer: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
