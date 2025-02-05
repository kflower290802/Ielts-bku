import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class suggestionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
