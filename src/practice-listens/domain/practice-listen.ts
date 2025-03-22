import { ApiProperty } from '@nestjs/swagger';
import { Practice } from '../../practices/domain/practice';

export class PracticeListen {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  audio: string;

  @ApiProperty()
  practice: Practice;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
