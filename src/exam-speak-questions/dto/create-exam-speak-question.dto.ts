import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateExamSpeakQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  partId: string;

  @ApiProperty({ type: String, format: 'binary' })
  question: Express.Multer.File;
}
