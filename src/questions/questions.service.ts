import { Injectable } from '@nestjs/common';
import { CreatequestionDto } from './dto/create-question.dto';
import { UpdatequestionDto } from './dto/update-question.dto';
import { questionRepository } from './infrastructure/persistence/question.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { question } from './domain/question';

@Injectable()
export class questionsService {
  constructor(private readonly questionRepository: questionRepository) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createquestionDto: CreatequestionDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.questionRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.questionRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: question['id']) {
    return this.questionRepository.findById(id);
  }

  findByIds(ids: question['id'][]) {
    return this.questionRepository.findByIds(ids);
  }

  async update(
    id: question['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatequestionDto: UpdatequestionDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.questionRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: question['id']) {
    return this.questionRepository.remove(id);
  }
}
