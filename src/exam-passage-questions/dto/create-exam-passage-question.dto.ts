import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AnswerDto {
  @ApiProperty({ description: 'The answer text' })
  @IsString()
  @IsNotEmpty()
  answer: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isCorrect: boolean;
}

export class CreateExamPassageQuestionDto {
  @ApiProperty()
  @IsString()
  question: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  examReadingTypeId: string;

  @ApiProperty({
    type: [AnswerDto],
    example: [
      {
        answer: 'Answer 1',
        isCorrect: true,
      },
      {
        answer: 'Answer 2',
        isCorrect: false,
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
