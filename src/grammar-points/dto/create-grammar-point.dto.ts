import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGrammarPointDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
