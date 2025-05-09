import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdatePracticeReadingAnswerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  answer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isCorrect: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}

export class UpdatePracticeReadingQuestionDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  question: string;

  @ApiProperty({
    type: [UpdatePracticeReadingAnswerDto],
    isArray: true,
    example: [{ answer: 'Paris', isCorrect: true, id: '123' }],
  })
  @IsNotEmpty()
  @IsArray()
  answers: UpdatePracticeReadingAnswerDto[];
}
