import { ApiProperty } from '@nestjs/swagger';
import { ExamSpeak } from '../../exam-speaks/domain/exam-speak';

export class ExamSpeakPart {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  examSpeak: ExamSpeak;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
