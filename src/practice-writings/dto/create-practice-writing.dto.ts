import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreatePracticeWritingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  practiceId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ type: String, required: false, format: 'binary' })
  image?: Express.Multer.File;
}
