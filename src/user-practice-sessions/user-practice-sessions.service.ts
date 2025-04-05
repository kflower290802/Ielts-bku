import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateUserPracticeSessionDto } from './dto/create-user-practice-session.dto';
import { UpdateUserPracticeSessionDto } from './dto/update-user-practice-session.dto';
import { UserPracticeSessionRepository } from './infrastructure/persistence/user-practice-session.repository';
import { UserPracticeSession } from './domain/user-practice-session';
import { User } from '../users/domain/user';
import { UserPractice } from '../user-practices/domain/user-practice';
import { UserPracticesService } from '../user-practices/user-practices.service';
import { getAllDatesBetween } from '../utils/time';

@Injectable()
export class UserPracticeSessionsService {
  constructor(
    private readonly userPracticeSessionRepository: UserPracticeSessionRepository,
    @Inject(forwardRef(() => UserPracticesService))
    private readonly userPracticesService: UserPracticesService,
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

  findByUserPracticeId(userPracticeId: UserPractice['id']) {
    return this.userPracticeSessionRepository.findByUserPracticeId(
      userPracticeId,
    );
  }

  getTimeSpentByDay(userId: User['id'], startTime: Date, endTime: Date) {
    return this.userPracticeSessionRepository.getTimeSpentByDay(
      userId,
      startTime,
      endTime,
    );
  }

  async getTimeSpentByUserId(
    userId: User['id'],
    startTime: Date,
    endTime: Date,
  ) {
    const userPractices =
      await this.userPracticesService.findUserPracticesByUserId(userId);
    const userPracticeIds = userPractices.map(
      (userPractice) => userPractice.id,
    );
    const userPracticeSessions =
      await this.userPracticeSessionRepository.findByUserPracticeIds(
        userPracticeIds,
        startTime,
        endTime,
      );
    const allDays = getAllDatesBetween(startTime, endTime);
    const dayScoreMap = new Map<string, Map<string, { total: number }>>();

    allDays.forEach((day) => {
      dayScoreMap.set(day, new Map<string, { total: number }>());
    });
    userPracticeSessions.forEach((session) => {
      const practiceDate = session.createdAt.toISOString().split('T')[0];
      const practiceType = session.userPractice.practice.type;
      if (!dayScoreMap.has(practiceDate)) {
        dayScoreMap.set(practiceDate, new Map<string, { total: number }>());
      }

      if (!dayScoreMap.get(practiceDate)?.has(practiceType)) {
        dayScoreMap.get(practiceDate)?.set(practiceType, { total: 0 });
      }
      const current = dayScoreMap.get(practiceDate)?.get(practiceType);
      if (current) {
        current.total +=
          (session.endTime?.getTime() || new Date().getTime()) -
          session.startTime.getTime();
      }
    });

    const result: { date: string; [key: string]: any }[] = [];

    const allTypes = new Set<string>();
    userPractices.forEach((practice) => {
      if (practice.practice && practice.practice.type) {
        allTypes.add(practice.practice.type);
      }
    });

    dayScoreMap.forEach((typeMap, date) => {
      const dayData: { date: string; [key: string]: any } = { date };

      allTypes.forEach((type) => {
        const scoreData = typeMap.get(type);
        dayData[type] = scoreData?.total || 0;
      });

      result.push(dayData);
    });
    return result.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }

  findAllByUserPracticeId(userPracticeId: UserPractice['id']) {
    return this.userPracticeSessionRepository.findAllByUserPracticeId(
      userPracticeId,
    );
  }
}
