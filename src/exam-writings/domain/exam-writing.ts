import { ApiProperty } from '@nestjs/swagger';
import { Exam } from '../../exams/domain/exam';

export class ExamWriting {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  exam: Exam;

  @ApiProperty()
  content: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
