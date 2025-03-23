import { ApiProperty } from '@nestjs/swagger';
import { Practice } from '../../practices/domain/practice';

export class PracticeSpeakingQuestion {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  audio: string;

  @ApiProperty()
  question: string;

  @ApiProperty()
  practice: Practice;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
