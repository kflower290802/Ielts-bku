import { ApiProperty } from '@nestjs/swagger';
import { GrammarPoint } from '../../grammar-points/domain/grammar-point';
import { Blog } from '../../blogs/domain/blog';

export class BlogGrammarPoint {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  grammarPoint: GrammarPoint;

  @ApiProperty()
  blog: Blog;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
