import { ApiProperty } from '@nestjs/swagger';
import { UserPractice } from '../../user-practices/domain/user-practice';
import { PracticeListenQuestion } from '../../practice-listen-questions/domain/practice-listen-question';

export class UserPracticeListenAnswer {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  userPractice: UserPractice;

  @ApiProperty()
  answer: string | string[];

  @ApiProperty()
  question: PracticeListenQuestion;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
