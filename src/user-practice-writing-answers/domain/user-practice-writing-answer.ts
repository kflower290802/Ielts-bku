import { ApiProperty } from '@nestjs/swagger';
import { UserPractice } from '../../user-practices/domain/user-practice';

export class UserPracticeWritingAnswer {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  userPractice: UserPractice;

  @ApiProperty()
  answer: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
