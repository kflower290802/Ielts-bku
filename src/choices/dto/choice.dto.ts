import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class choiceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
