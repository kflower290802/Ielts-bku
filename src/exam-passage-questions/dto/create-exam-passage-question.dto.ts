import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExamPassageQuestionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  examPassageId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  question: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  answer: string;
}
