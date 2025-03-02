import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserExamListenAnswerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
