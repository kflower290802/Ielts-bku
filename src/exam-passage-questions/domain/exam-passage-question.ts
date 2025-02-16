import { ApiProperty } from '@nestjs/swagger';
import { ExamPassage } from '../../exam-passages/domain/exam-passage';

export class ExamPassageQuestion {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  examPassage: ExamPassage;

  @ApiProperty()
  question: string;

  @ApiProperty()
  answer: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
