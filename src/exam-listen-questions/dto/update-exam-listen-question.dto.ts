import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsOptional,
  ValidateNested,
  IsString,
  IsArray,
  IsBoolean,
  IsMongoId,
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
  @IsOptional()
  @IsMongoId()
  id?: string;
}

export class UpdateExamListenQuestionDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  question: string;

  @ApiProperty({
    type: [AnswerDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
