import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogLessonDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lessonId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  blogId: string;
}
