import { ApiProperty } from '@nestjs/swagger';
import { ExamPassage } from '../../exam-passages/domain/exam-passage';

export class ExamPassageQuestion {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  examPassage: ExamPassage;

  @ApiProperty()
  leftContent?: string;

  @ApiProperty()
  rightContent?: string;

  @ApiProperty()
  question: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
