import { ApiProperty } from '@nestjs/swagger';

export class Subscription {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
