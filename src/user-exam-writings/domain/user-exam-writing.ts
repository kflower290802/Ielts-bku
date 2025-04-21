import { ApiProperty } from '@nestjs/swagger';
import { UserExam } from '../../user-exams/domain/user-exam';
import { ExamWriting } from '../../exam-writings/domain/exam-writing';

export class UserExamWriting {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  userExam: UserExam;

  @ApiProperty()
  examWriting: ExamWriting;

  @ApiProperty()
  answer: string;

  @ApiProperty()
  taskResponse?: number;

  @ApiProperty()
  taskResponseDetails?: string;

  @ApiProperty()
  coherenceAndCohesion?: number;

  @ApiProperty()
  coherenceAndCohesionDetails?: string;

  @ApiProperty()
  lexicalResource?: number;

  @ApiProperty()
  lexicalResourceDetails?: string;

  @ApiProperty()
  grammaticalRangeAndAccuracy?: number;

  @ApiProperty()
  grammaticalRangeAndAccuracyDetails?: string;

  @ApiProperty()
  overallBandScore?: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
