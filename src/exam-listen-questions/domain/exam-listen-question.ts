import { ApiProperty } from '@nestjs/swagger';
import { ExamListenSection } from '../../exam-listen-sections/domain/exam-listen-section';

export class ExamListenQuestion {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  examListenSection: ExamListenSection;

  @ApiProperty()
  question: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
