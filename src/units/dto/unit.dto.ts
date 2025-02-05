import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class unitDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
