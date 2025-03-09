import { ApiProperty } from '@nestjs/swagger';
import { Exam } from '../../exams/domain/exam';
import { QuestionType } from '../../utils/types/question.type';

export class ExamPassage {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  passage: string;

  @ApiProperty()
  type: QuestionType;

  @ApiProperty()
  blankPassage?: string;

  @ApiProperty()
  exam: Exam;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
