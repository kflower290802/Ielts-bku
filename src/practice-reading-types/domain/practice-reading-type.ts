import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '../../utils/types/question.type';
import { PracticeReading } from '../../practice-readings/domain/practice-reading';

export class PracticeReadingType {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  type: QuestionType;

  @ApiProperty()
  practiceReading: PracticeReading;

  @ApiProperty()
  content?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
