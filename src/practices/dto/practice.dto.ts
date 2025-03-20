import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PracticeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
