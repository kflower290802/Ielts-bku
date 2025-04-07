import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateBlogTopicDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  topicId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  blogId: string;
}
