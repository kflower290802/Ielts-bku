import { ApiProperty } from '@nestjs/swagger';
import { PracticeListenType } from '../../practice-listen-types/domain/practice-listen-type';

export class PracticeListenQuestion {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  type: PracticeListenType;

  @ApiProperty()
  question: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
