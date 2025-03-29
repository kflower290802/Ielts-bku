import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserExamSpeakAnswerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  examId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  questionId: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  answer: string;
}
