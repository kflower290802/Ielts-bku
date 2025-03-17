import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateExamListenQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  examListenTypeId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  question: string;
}
