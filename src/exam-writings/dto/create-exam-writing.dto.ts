import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateExamWritingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  examId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: false,
  })
  @IsOptional()
  image?: Express.Multer.File;
}

export class GradeEssayDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  essay: string;
}
