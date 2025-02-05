import { Injectable } from '@nestjs/common';
import { Createquestion_resultDto } from './dto/create-question-result.dto';
import { Updatequestion_resultDto } from './dto/update-question-result.dto';
import { question_resultRepository } from './infrastructure/persistence/question-result.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { question_result } from './domain/question-result';

@Injectable()
export class question_resultsService {
  constructor(
    // Dependencies here
    private readonly questionResultRepository: question_resultRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createquestion_resultDto: Createquestion_resultDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.questionResultRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.questionResultRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: question_result['id']) {
    return this.questionResultRepository.findById(id);
  }

  findByIds(ids: question_result['id'][]) {
    return this.questionResultRepository.findByIds(ids);
  }

  async update(
    id: question_result['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatequestion_resultDto: Updatequestion_resultDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.questionResultRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: question_result['id']) {
    return this.questionResultRepository.remove(id);
  }
}
