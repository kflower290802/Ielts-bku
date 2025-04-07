import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    format: 'binary',
  })
  image: Express.Multer.File;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  topicId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  grammarPointId: string;
}
