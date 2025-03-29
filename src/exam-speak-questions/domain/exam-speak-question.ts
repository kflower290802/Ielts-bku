import { ApiProperty } from '@nestjs/swagger';
import { ExamSpeakPart } from '../../exam-speak-parts/domain/exam-speak-part';

export class ExamSpeakQuestion {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  part: ExamSpeakPart;

  @ApiProperty()
  question: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
