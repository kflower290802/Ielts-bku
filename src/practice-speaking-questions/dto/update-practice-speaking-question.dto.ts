import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePracticeSpeakingQuestionDto {
  @ApiProperty({ type: String, required: false, format: 'binary' })
  audio?: Express.Multer.File;

  @ApiProperty()
  @IsOptional()
  @IsString()
  question?: string;
}
