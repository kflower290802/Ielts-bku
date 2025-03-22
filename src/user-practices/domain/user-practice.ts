import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { Practice } from '../../practices/domain/practice';

export class UserPractice {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  user: User;

  @ApiProperty()
  practice: Practice;

  @ApiProperty({ type: Boolean, required: false })
  isCompleted?: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
