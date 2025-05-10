import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateExamListenTypeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;
}
