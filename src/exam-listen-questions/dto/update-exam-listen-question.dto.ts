import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsOptional,
  ValidateNested,
  IsString,
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
} from 'class-validator';

export class AnswerDto {
  @ApiProperty({ description: 'The answer text' })
  @IsOptional()
  @IsString()
  answer: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isCorrect: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}

export class UpdateExamListenQuestionDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  question: string;

  @ApiProperty({
    type: [AnswerDto],
    example: [
      {
        answer: 'Answer 1',
        isCorrect: true,
        id: '668d6b7b8d6b7b8d6b7b8d6b',
      },
      {
        answer: 'Answer 2',
        isCorrect: false,
        id: '668d6b7b8d6b7b8d6b7b8d6b',
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
