import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExamPassageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  examId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  passage: string;
}
