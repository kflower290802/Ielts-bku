import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExamListenAnswerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  examListenQuestionId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  answer: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isCorrect: boolean;
}
