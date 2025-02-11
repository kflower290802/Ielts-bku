import { ApiProperty } from '@nestjs/swagger';
import { Lesson } from '../../lessons/domain/lesson';
import { Blog } from '../../blogs/domain/blog';

export class BlogLesson {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  lesson: Lesson;

  @ApiProperty()
  blog: Blog;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
