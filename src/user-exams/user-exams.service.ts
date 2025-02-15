import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserExamDto } from './dto/create-user-exam.dto';
import { UpdateUserExamDto } from './dto/update-user-exam.dto';
import { UserExamRepository } from './infrastructure/persistence/user-exam.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { UserExam } from './domain/user-exam';
import { UsersService } from '../users/users.service';
import { ExamsService } from '../exams/exams.service';

@Injectable()
export class UserExamsService {
  constructor(
    // Dependencies here
    private readonly userExamRepository: UserExamRepository,
    private readonly usersService: UsersService,
    private readonly examsService: ExamsService,
  ) {}

  async create(createUserExamDto: CreateUserExamDto) {
    // Do not remove comment below.
    // <creating-property />
    const { userId, examId, ...rest } = createUserExamDto;
    const user = await this.usersService.findById(userId);

    if (!user) throw new BadRequestException('User not found');

    const exam = await this.examsService.findById(examId);

    if (!exam) throw new BadRequestException('Exam not found');
    return this.userExamRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      user,
      exam,
      ...rest,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.userExamRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: UserExam['id']) {
    return this.userExamRepository.findById(id);
  }

  findByIds(ids: UserExam['id'][]) {
    return this.userExamRepository.findByIds(ids);
  }

  async update(
    id: UserExam['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateUserExamDto: UpdateUserExamDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.userExamRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: UserExam['id']) {
    return this.userExamRepository.remove(id);
  }
}
