import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class test_resultDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
