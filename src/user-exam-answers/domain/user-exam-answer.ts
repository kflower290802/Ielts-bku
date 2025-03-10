import { ApiProperty } from '@nestjs/swagger';
import { ExamPassageQuestion } from '../../exam-passage-questions/domain/exam-passage-question';
import { UserExam } from '../../user-exams/domain/user-exam';

export class UserExamAnswer {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  userExam: UserExam;

  @ApiProperty()
  examPassageQuestion: ExamPassageQuestion;

  @ApiProperty()
  answer: string | string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
