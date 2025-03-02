import { ApiProperty } from '@nestjs/swagger';
import { ExamListenSection } from '../../exam-listen-sections/domain/exam-listen-section';
import { QuestionType } from '../../utils/types/question.type';

export class ExamListenQuestion {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  examListenSection: ExamListenSection;

  @ApiProperty()
  question: string;

  @ApiProperty({
    enum: [
      QuestionType.MultipleChoice,
      QuestionType.SingleChoice,
      QuestionType.TextBox,
    ],
  })
  type: QuestionType;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
