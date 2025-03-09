import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class AnswerDto {
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
  @IsNotEmpty()
  examPassageId: string;

  @ApiProperty()
  @IsString()
  question: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  leftContent?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  rightContent?: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
