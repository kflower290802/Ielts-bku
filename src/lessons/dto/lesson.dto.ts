import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class lessonDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
