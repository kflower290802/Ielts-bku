import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateUserPracticeDto } from './dto/create-user-practice.dto';
import { UpdateUserPracticeDto } from './dto/update-user-practice.dto';
import { UserPracticeRepository } from './infrastructure/persistence/user-practice.repository';
import { UserPractice } from './domain/user-practice';
import { UserPracticeSessionsService } from 'src/user-practice-sessions/user-practice-sessions.service';
@Injectable()
export class UserPracticesService {
  constructor(
    private readonly userPracticeRepository: UserPracticeRepository,
    @Inject(forwardRef(() => UserPracticeSessionsService))
    private readonly userPracticeSessionsService: UserPracticeSessionsService,
  ) {}

  async create(createUserPracticeDto: CreateUserPracticeDto) {
    return this.userPracticeRepository.create(createUserPracticeDto);
  }

  findById(id: UserPractice['id']) {
    return this.userPracticeRepository.findById(id);
  }

  findByIds(ids: UserPractice['id'][]) {
    return this.userPracticeRepository.findByIds(ids);
  }

  async update(
    id: UserPractice['id'],
    updateUserPracticeDto: UpdateUserPracticeDto,
  ) {
    return this.userPracticeRepository.update(id, updateUserPracticeDto);
  }

  remove(id: UserPractice['id']) {
    return this.userPracticeRepository.remove(id);
  }

  findByPracticeIdAndUserId(practiceId: string, userId: string) {
    return this.userPracticeRepository.findByPracticeIdAndUserId(
      practiceId,
      userId,
    );
  }

  findCompletedByPracticeIdAndUserId(practiceId: string, userId: string) {
    return this.userPracticeRepository.findCompletedUserPracticeByPracticeIdAndUserId(
      practiceId,
      userId,
    );
  }

  findUnCompletedUserPracticeByPracticeIdAndUserId(
    practiceId: string,
    userId: string,
  ) {
    return this.userPracticeRepository.findUnCompletedUserPracticeByPracticeIdAndUserId(
      practiceId,
      userId,
    );
  }

  findByUserIdAndPracticeIdInDay(userId: string, practiceId: string) {
    return this.userPracticeRepository.findByUserIdAndPracticeIdInDay(
      userId,
      practiceId,
    );
  }

  findUserPracticesByUserId(userId: string) {
    return this.userPracticeRepository.findUserPracticesByUserId(userId);
  }

  async getUserPracticeByUserIdWithPagination(userId: string) {
    const userPractices =
      await this.userPracticeRepository.getUserPracticeByUserIdWithPagination(
        userId,
      );
    return Promise.all(
      userPractices.map(async (u) => {
        const userPracticeSessions =
          await this.userPracticeSessionsService.findAllByUserPracticeId(u.id);
        const startTime = userPracticeSessions[0]?.startTime;
        const endTime = u.isCompleted
          ? userPracticeSessions[userPracticeSessions.length - 1]?.endTime
          : null;
        return {
          ...u,
          startTime,
          endTime,
        };
      }),
    );
  }
}
