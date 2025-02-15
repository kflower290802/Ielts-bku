import { Injectable } from '@nestjs/common';
import { CreateUserExamDto } from './dto/create-user-exam.dto';
import { UpdateUserExamDto } from './dto/update-user-exam.dto';
import { UserExamRepository } from './infrastructure/persistence/user-exam.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { UserExam } from './domain/user-exam';

@Injectable()
export class UserExamsService {
  constructor(
    // Dependencies here
    private readonly userExamRepository: UserExamRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createUserExamDto: CreateUserExamDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.userExamRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
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
