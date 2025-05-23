import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class UpdateAnswerDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  answer: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isCorrect: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId()
  id: string;
}

export class UpdateExamPassageQuestionDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  question: string;

  @ApiProperty({
    type: [UpdateAnswerDto],
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
  @Type(() => UpdateAnswerDto)
  answers: UpdateAnswerDto[];
}
