import { ApiProperty } from '@nestjs/swagger';
import { Topic } from '../../topics/domain/topic';
import { Blog } from '../../blogs/domain/blog';

export class BlogTopic {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  topic: Topic;

  @ApiProperty()
  blog: Blog;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
