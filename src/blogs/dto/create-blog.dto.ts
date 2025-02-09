import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BlogStatus } from '../blog.type';

export class CreateBlogDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  content?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(BlogStatus, {
    message: 'invalidBlogStatus',
  })
  status?: BlogStatus;
}
