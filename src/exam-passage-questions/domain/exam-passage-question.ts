import { ApiProperty } from '@nestjs/swagger';
import { ExamReadingType } from '../../exam-reading-types/domain/exam-reading-type';

export class ExamPassageQuestion {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  examReadingType: ExamReadingType;

  @ApiProperty()
  question: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
