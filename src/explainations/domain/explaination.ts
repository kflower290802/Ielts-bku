import { ApiProperty } from '@nestjs/swagger';
import { Choice } from '../../choices/domain/choice';

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
  choice: Choice;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
