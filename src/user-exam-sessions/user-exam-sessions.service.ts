import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserExamSessionDto } from './dto/create-user-exam-session.dto';
import { UpdateUserExamSessionDto } from './dto/update-user-exam-session.dto';
import { UserExamSessionRepository } from './infrastructure/persistence/user-exam-session.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { UserExamSession } from './domain/user-exam-session';
import { UserExamsService } from '../user-exams/user-exams.service';

@Injectable()
export class UserExamSessionsService {
  constructor(
    private readonly userExamSessionRepository: UserExamSessionRepository,
    private readonly userExamsService: UserExamsService,
  ) {}

  async create(createUserExamSessionDto: CreateUserExamSessionDto) {
    // Do not remove comment below.
    // <creating-property />

    const { examUserId, ...rest } = createUserExamSessionDto;

    const userExam = await this.userExamsService.findById(examUserId);

    if (!userExam) throw new BadRequestException('Exam user not found');
    return this.userExamSessionRepository.create({
      userExam,
      ...rest,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.userExamSessionRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: UserExamSession['id']) {
    return this.userExamSessionRepository.findById(id);
  }

  findByIds(ids: UserExamSession['id'][]) {
    return this.userExamSessionRepository.findByIds(ids);
  }

  async update(
    id: UserExamSession['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateUserExamSessionDto: UpdateUserExamSessionDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.userExamSessionRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: UserExamSession['id']) {
    return this.userExamSessionRepository.remove(id);
  }

  async getTotalTimeSpent(userExamId: string): Promise<number> {
    const sessions =
      await this.userExamSessionRepository.getSessionsByUserExamId(userExamId);
    return sessions.reduce((total, session) => {
      const sessionTime =
        ((session.endTime?.getTime() || new Date().getTime()) -
          session.startTime.getTime()) /
        60000;
      return total + sessionTime;
    }, 0);
  }
}
