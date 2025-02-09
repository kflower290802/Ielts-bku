import { ApiProperty } from '@nestjs/swagger';
import { BlogStatus } from '../blog.type';

export class Blog {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  title: string;

  @ApiProperty({
    type: String,
  })
  content?: string;

  @ApiProperty({
    type: String,
  })
  image: string;

  @ApiProperty({
    type: String,
  })
  status?: BlogStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
