import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BlogLessonDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
