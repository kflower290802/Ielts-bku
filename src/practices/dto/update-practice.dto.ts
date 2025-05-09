import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsMongoId, IsString } from 'class-validator';

export class UpdatePracticeDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  topicId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ type: String, required: false, format: 'binary' })
  image?: Express.Multer.File;
}
