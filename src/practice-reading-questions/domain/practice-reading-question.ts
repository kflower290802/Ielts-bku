import { ApiProperty } from '@nestjs/swagger';
import { PracticeReadingType } from '../../practice-reading-types/domain/practice-reading-type';

export class PracticeReadingQuestion {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  question: string;

  @ApiProperty()
  type: PracticeReadingType;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
