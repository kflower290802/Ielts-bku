import { PracticeListenQuestion } from '../../practice-listen-questions/domain/practice-listen-question';
import { UserPractice } from '../../user-practices/domain/user-practice';

export class CreateUserPracticeListenAnswerDto {
  userPractice: UserPractice;
  question: PracticeListenQuestion;
  answer: string | string[];
}
