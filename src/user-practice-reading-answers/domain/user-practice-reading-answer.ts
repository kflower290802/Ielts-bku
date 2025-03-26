import { ApiProperty } from '@nestjs/swagger';
import { UserPractice } from '../../user-practices/domain/user-practice';
import { PracticeReadingQuestion } from '../../practice-reading-questions/domain/practice-reading-question';

export class UserPracticeReadingAnswer {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  userPractice: UserPractice;

  @ApiProperty()
  answer: string | string[];

  @ApiProperty()
  question: PracticeReadingQuestion;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
