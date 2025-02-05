import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class noteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
