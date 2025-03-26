import { PracticeReadingQuestion } from '../../practice-reading-questions/domain/practice-reading-question';
import { UserPractice } from '../../user-practices/domain/user-practice';

export class CreateUserPracticeReadingAnswerDto {
  userPractice: UserPractice;
  question: PracticeReadingQuestion;
  answer: string | string[];
}
