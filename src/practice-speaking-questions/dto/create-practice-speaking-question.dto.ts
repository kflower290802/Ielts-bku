import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreatePracticeSpeakingQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  practiceId: string;

  @ApiProperty({ type: String, required: true, format: 'binary' })
  audio: Express.Multer.File;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  question: string;
}
