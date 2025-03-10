import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateExamListenQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  examListenSectionId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  question: string;
}
