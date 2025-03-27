import { Injectable } from '@nestjs/common';
import { CreateUserPracticeWritingAnswerDto } from './dto/create-user-practice-writing-answer.dto';
import { UpdateUserPracticeWritingAnswerDto } from './dto/update-user-practice-writing-answer.dto';
import { UserPracticeWritingAnswerRepository } from './infrastructure/persistence/user-practice-writing-answer.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { UserPracticeWritingAnswer } from './domain/user-practice-writing-answer';

@Injectable()
export class UserPracticeWritingAnswersService {
  constructor(
    private readonly userPracticeWritingAnswerRepository: UserPracticeWritingAnswerRepository,
  ) {}

  async create(
    createUserPracticeWritingAnswerDto: CreateUserPracticeWritingAnswerDto,
  ) {
    return this.userPracticeWritingAnswerRepository.create(
      createUserPracticeWritingAnswerDto,
    );
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.userPracticeWritingAnswerRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: UserPracticeWritingAnswer['id']) {
    return this.userPracticeWritingAnswerRepository.findById(id);
  }

  findByIds(ids: UserPracticeWritingAnswer['id'][]) {
    return this.userPracticeWritingAnswerRepository.findByIds(ids);
  }

  async update(
    id: UserPracticeWritingAnswer['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateUserPracticeWritingAnswerDto: UpdateUserPracticeWritingAnswerDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.userPracticeWritingAnswerRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: UserPracticeWritingAnswer['id']) {
    return this.userPracticeWritingAnswerRepository.remove(id);
  }

  findByUserPracticeId(id: string) {
    return this.userPracticeWritingAnswerRepository.finByUserPracticeId(id);
  }
}
