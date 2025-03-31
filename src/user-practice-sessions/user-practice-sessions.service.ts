import { Injectable } from '@nestjs/common';
import { CreateUserPracticeSessionDto } from './dto/create-user-practice-session.dto';
import { UpdateUserPracticeSessionDto } from './dto/update-user-practice-session.dto';
import { UserPracticeSessionRepository } from './infrastructure/persistence/user-practice-session.repository';
import { UserPracticeSession } from './domain/user-practice-session';
import { User } from '../users/domain/user';

@Injectable()
export class UserPracticeSessionsService {
  constructor(
    private readonly userPracticeSessionRepository: UserPracticeSessionRepository,
  ) {}

  create(createUserPracticeSessionDto: CreateUserPracticeSessionDto) {
    return this.userPracticeSessionRepository.create(
      createUserPracticeSessionDto,
    );
  }

  findById(id: UserPracticeSession['id']) {
    return this.userPracticeSessionRepository.findById(id);
  }

  async update(
    id: UserPracticeSession['id'],
    updateUserPracticeSessionDto: UpdateUserPracticeSessionDto,
  ) {
    return this.userPracticeSessionRepository.update(
      id,
      updateUserPracticeSessionDto,
    );
  }

  getTimeSpentByDay(userId: User['id'], startTime: Date, endTime: Date) {
    return this.userPracticeSessionRepository.getTimeSpentByDay(
      userId,
      startTime,
      endTime,
    );
  }
}
