import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AnswerDto } from '../../exam-passage-questions/dto/create-exam-passage-question.dto';

export class CreateExamListenQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  examListenTypeId: string;

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
