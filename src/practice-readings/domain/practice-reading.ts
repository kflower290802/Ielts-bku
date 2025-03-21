import { ApiProperty } from '@nestjs/swagger';
import { Practice } from '../../practices/domain/practice';

export class PracticeReading {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  practice: Practice;

  @ApiProperty()
  title: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
