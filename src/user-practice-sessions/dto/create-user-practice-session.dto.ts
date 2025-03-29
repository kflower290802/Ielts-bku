import { UserPractice } from '../../user-practices/domain/user-practice';
export class CreateUserPracticeSessionDto {
  userPractice: UserPractice;
  startTime: Date;
  endTime?: Date;
}
