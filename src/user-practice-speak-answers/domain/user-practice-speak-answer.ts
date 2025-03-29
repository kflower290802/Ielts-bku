import { ApiProperty } from '@nestjs/swagger';
import { PracticeSpeakingQuestion } from '../../practice-speaking-questions/domain/practice-speaking-question';
import { UserPractice } from '../../user-practices/domain/user-practice';

export class UserPracticeSpeakAnswer {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  userPractice: UserPractice;

  @ApiProperty()
  answer: string;

  @ApiProperty()
  question: PracticeSpeakingQuestion;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
