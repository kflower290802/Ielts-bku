import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class questionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
