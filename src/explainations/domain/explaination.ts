import { ApiProperty } from '@nestjs/swagger';

export class Explaination {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  key: string;

  @ApiProperty({ example: 'https/url.com' })
  doc: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
