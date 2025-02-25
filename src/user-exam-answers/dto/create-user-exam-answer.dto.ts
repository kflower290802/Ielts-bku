import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserExamAnswerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  examId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  examPassageQuestionId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  answer: string;
}
