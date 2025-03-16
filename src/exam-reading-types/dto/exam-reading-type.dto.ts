import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ExamReadingTypeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
