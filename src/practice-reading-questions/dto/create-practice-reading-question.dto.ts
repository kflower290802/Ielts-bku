import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreatePracticeReadingAnswerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  answer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isCorrect: boolean;
}

export class CreatePracticeReadingQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  question: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  practiceReadingTypeId: string;

  @ApiProperty({
    type: [CreatePracticeReadingAnswerDto],
    isArray: true,
    example: [{ answer: 'Paris', isCorrect: true }],
  })
  @IsNotEmpty()
  @IsArray()
  answers: CreatePracticeReadingAnswerDto[];
}
