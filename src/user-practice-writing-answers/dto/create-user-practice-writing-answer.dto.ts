import { UserPractice } from '../../user-practices/domain/user-practice';

export class CreateUserPracticeWritingAnswerDto {
  userPractice: UserPractice;
  answer: string;
}
