import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExamSpeakDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  examId: string;

  @ApiProperty({
    type: String,
    format: 'binary',
  })
  audio: Express.Multer.File;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  question: string;
}
