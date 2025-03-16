import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateExamPassageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  examId: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @MinLength(1)
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  passage: string;
}
