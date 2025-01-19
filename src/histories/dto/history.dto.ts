import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class HistoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
