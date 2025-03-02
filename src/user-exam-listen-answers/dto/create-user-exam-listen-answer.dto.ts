import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserExamListenAnswerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  userExamId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  examPassageQuestionId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  answer: string;
}
