import { ApiProperty } from '@nestjs/swagger';
import { UserPractice } from '../../user-practices/domain/user-practice';

export class UserPracticeSession {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  userPractice: UserPractice;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime?: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
