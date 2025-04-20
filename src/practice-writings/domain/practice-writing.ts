import { ApiProperty } from '@nestjs/swagger';
import { Practice } from '../../practices/domain/practice';

export class PracticeWriting {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  image?: string;

  @ApiProperty()
  imageDetails?: string;

  @ApiProperty()
  practice: Practice;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
