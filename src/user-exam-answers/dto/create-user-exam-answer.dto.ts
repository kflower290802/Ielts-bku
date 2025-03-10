import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateUserExamAnswerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  examId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  examPassageQuestionId: string;

  @ValidateIf((o) => Array.isArray(o.value))
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  answer: string | string[];
}
