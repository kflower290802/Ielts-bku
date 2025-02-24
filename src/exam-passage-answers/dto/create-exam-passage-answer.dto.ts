import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { ExamPassageQuestion } from '../../exam-passage-questions/domain/exam-passage-question';

export class CreateExamPassageAnswerDto {
  @IsNotEmpty()
  question: ExamPassageQuestion;

  @IsNotEmpty()
  answer: string;

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  isCorrect?: boolean;
}
