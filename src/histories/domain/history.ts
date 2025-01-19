import { ApiProperty } from '@nestjs/swagger';

export class History {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  score: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
