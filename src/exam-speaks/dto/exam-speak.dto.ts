import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ExamSpeakDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
