import { ApiProperty } from '@nestjs/swagger';
import { ExamType } from '../exams.type';

export class Exam {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: ExamType;

  @ApiProperty()
  time: number;

  @ApiProperty()
  image: string;

  @ApiProperty()
  audio?: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  isDeleted?: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
