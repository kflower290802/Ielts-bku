import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { Exam } from '../../exams/domain/exam';

export class UserExam {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  user: User;

  @ApiProperty()
  exam: Exam;

  @ApiProperty()
  score: number;

  @ApiProperty()
  progress: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
