import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserExamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  examId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  progress: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  score: number;
}
