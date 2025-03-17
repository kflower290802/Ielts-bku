import { ApiProperty } from '@nestjs/swagger';
import { ExamListenType } from '../../exam-listen-types/domain/exam-listen-type';

export class ExamListenQuestion {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  examListenType: ExamListenType;

  @ApiProperty()
  question: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
