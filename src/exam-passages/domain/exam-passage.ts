import { ApiProperty } from '@nestjs/swagger';
import { Exam } from '../../exams/domain/exam';

export class ExamPassage {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  passage: string;

  @ApiProperty()
  exam: Exam;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
