import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateUserExamListenAnswerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  examId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  examPassageQuestionId: string;

  @ApiProperty({
    type: [String],
    description: 'Answer can be a string or an array of strings',
  })
  @ValidateIf((o) => typeof o.answer === 'string')
  @IsString()
  @ValidateIf((o) => Array.isArray(o.answer))
  @IsArray()
  @IsString({ each: true })
  answer: string | string[];
}
