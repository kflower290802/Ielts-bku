import { ApiProperty } from '@nestjs/swagger';
import { UserExam } from '../../user-exams/domain/user-exam';
import { ExamListenSection } from '../../exam-listen-sections/domain/exam-listen-section';

export class UserExamListenAnswer {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  userExam: UserExam;

  @ApiProperty()
  examPassageQuestion: ExamListenSection;

  @ApiProperty()
  answer: string | string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
