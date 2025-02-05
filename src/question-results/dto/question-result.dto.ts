import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class question_resultDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
