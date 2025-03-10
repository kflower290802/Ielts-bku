import { ApiProperty } from '@nestjs/swagger';
import { Exam } from '../../exams/domain/exam';
import { QuestionType } from '../../utils/types/question.type';

export class ExamListenSection {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  exam: Exam;

  @ApiProperty()
  audio: string;

  @ApiProperty()
  type: QuestionType;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
