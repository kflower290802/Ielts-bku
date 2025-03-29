import { ApiProperty } from '@nestjs/swagger';
import { UserExam } from '../../user-exams/domain/user-exam';
import { ExamSpeakQuestion } from '../../exam-speak-questions/domain/exam-speak-question';

export class UserExamSpeakAnswer {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  userExam: UserExam;

  @ApiProperty()
  question: ExamSpeakQuestion;

  @ApiProperty()
  answer: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
