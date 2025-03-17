import { ApiProperty } from '@nestjs/swagger';
import { Exam } from '../../exams/domain/exam';

export class ExamListenSection {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  exam: Exam;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
