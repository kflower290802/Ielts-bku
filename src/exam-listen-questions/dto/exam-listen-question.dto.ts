import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ExamListenQuestionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
