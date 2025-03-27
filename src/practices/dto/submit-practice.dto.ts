import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class SubmitPracticeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  questionId: string;

  @ApiProperty()
  @IsNotEmpty()
  answer: string[] | string;
}

export class SubmitPracticeWritingDto {
  @ApiProperty()
  @IsNotEmpty()
  answer: string;
}
