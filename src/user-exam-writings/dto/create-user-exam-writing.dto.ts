import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserExamWritingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  examId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  examWritingId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  answer: string;
}
