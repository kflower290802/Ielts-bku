import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { QuestionType } from '../../utils/types/question.type';

export class CreateExamListenSectionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  examId: string;

  @ApiProperty({
    type: String,
    format: 'binary',
  })
  audio: Express.Multer.File;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  type: QuestionType;
}
