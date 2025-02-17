import { Injectable } from '@nestjs/common';
import { CreateUserExamAnswerDto } from './dto/create-user-exam-answer.dto';
import { UpdateUserExamAnswerDto } from './dto/update-user-exam-answer.dto';
import { UserExamAnswerRepository } from './infrastructure/persistence/user-exam-answer.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { UserExamAnswer } from './domain/user-exam-answer';

@Injectable()
export class UserExamAnswersService {
  constructor(
    // Dependencies here
    private readonly userExamAnswerRepository: UserExamAnswerRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createUserExamAnswerDto: CreateUserExamAnswerDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.userExamAnswerRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.userExamAnswerRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: UserExamAnswer['id']) {
    return this.userExamAnswerRepository.findById(id);
  }

  findByIds(ids: UserExamAnswer['id'][]) {
    return this.userExamAnswerRepository.findByIds(ids);
  }

  async update(
    id: UserExamAnswer['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateUserExamAnswerDto: UpdateUserExamAnswerDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.userExamAnswerRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: UserExamAnswer['id']) {
    return this.userExamAnswerRepository.remove(id);
  }
}
