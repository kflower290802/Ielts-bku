import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsMongoId,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePracticeListenAnswerDto {
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

export class UpdatePracticeListenQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  typeId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  question: string;

  @ApiProperty({
    type: [UpdatePracticeListenAnswerDto],
    isArray: true,
    example: [{ answer: 'Paris', isCorrect: true, id: '123' }],
  })
  @IsNotEmpty()
  @IsArray()
  answers: UpdatePracticeListenAnswerDto[];
}
