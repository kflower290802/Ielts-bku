import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePracticeListenAnswerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  answer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isCorrect: boolean;
}

export class CreatePracticeListenQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  typeId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  question: string;

  @ApiProperty({
    type: [CreatePracticeListenAnswerDto],
    isArray: true,
    example: [{ answer: 'Paris', isCorrect: true }],
  })
  @IsNotEmpty()
  @IsArray()
  answers: CreatePracticeListenAnswerDto[];
}
