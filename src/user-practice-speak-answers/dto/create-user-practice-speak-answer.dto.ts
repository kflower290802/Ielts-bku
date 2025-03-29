import { ApiProperty } from '@nestjs/swagger';
import { UserPractice } from '../../user-practices/domain/user-practice';
import { PracticeSpeakingQuestion } from '../../practice-speaking-questions/domain/practice-speaking-question';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUserPracticeSpeakAnswerDto {
  @ApiProperty()
  @IsNotEmpty()
  userPractice: UserPractice;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  answer: string;

  @ApiProperty()
  @IsNotEmpty()
  question: PracticeSpeakingQuestion;
}
