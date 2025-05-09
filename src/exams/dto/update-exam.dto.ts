import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateExamDto {
  @ApiProperty({
    example: 'Listening',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    type: String,
    required: false,
    format: 'binary',
  })
  file?: Express.Multer.File;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: false,
  })
  audio?: Express.Multer.File;

  @ApiProperty({ example: 2024, required: false })
  @IsOptional()
  year?: number;
}
