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

  @ApiProperty({ type: Number, required: false })
  score?: number;

  @ApiProperty()
  taskResponse?: number;

  @ApiProperty()
  coherenceAndCohesion?: number;

  @ApiProperty()
  lexicalResource?: number;

  @ApiProperty()
  grammaticalRangeAndAccuracy?: number;

  @ApiProperty({ type: Boolean, required: false })
  isCompleted?: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
