import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreatePracticeReadingDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  practiceId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ type: String, format: 'binary' })
  image: Express.Multer.File;
}
