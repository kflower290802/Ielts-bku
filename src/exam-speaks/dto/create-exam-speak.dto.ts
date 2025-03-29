import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExamSpeakDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  examId: string;
}
