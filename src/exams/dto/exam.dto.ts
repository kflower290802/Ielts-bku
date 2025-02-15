import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ExamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
