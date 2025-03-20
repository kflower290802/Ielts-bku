import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PraticeReadingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
