import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ExamType } from '../exams.type';
import { Transform } from 'class-transformer';

export class CreateExamDto {
  @ApiProperty({
    example: 'Listening',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: ExamType.Listening })
  @IsNotEmpty()
  @IsEnum(ExamType)
  type: ExamType;

  @ApiProperty({
    type: String,
    format: 'binary',
  })
  file: Express.Multer.File;

  @ApiProperty({ example: 2024 })
  @Transform(({ value }) => +value)
  @IsNotEmpty()
  year: number;

  @ApiProperty()
  @Transform(({ value }) => +value)
  @IsNotEmpty()
  time: number;
}
