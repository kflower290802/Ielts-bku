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
  taskResponseDetails?: string;

  @ApiProperty()
  coherenceAndCohesion?: number;

  @ApiProperty()
  coherenceAndCohesionDetails?: string;

  @ApiProperty()
  lexicalResource?: number;

  @ApiProperty()
  lexicalResourceDetails?: string;

  @ApiProperty()
  grammaticalRangeAndAccuracy?: number;

  @ApiProperty()
  grammaticalRangeAndAccuracyDetails?: string;

  @ApiProperty({ type: Boolean, required: false })
  isCompleted?: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
