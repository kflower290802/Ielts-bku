import { Injectable } from '@nestjs/common';
import { Createtest_resultDto } from './dto/create-test-result.dto';
import { Updatetest_resultDto } from './dto/update-test-result.dto';
import { test_resultRepository } from './infrastructure/persistence/test-result.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { test_result } from './domain/test-result';

@Injectable()
export class test_resultsService {
  constructor(
    // Dependencies here
    private readonly testResultRepository: test_resultRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createtest_resultDto: Createtest_resultDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.testResultRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.testResultRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: test_result['id']) {
    return this.testResultRepository.findById(id);
  }

  findByIds(ids: test_result['id'][]) {
    return this.testResultRepository.findByIds(ids);
  }

  async update(
    id: test_result['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatetest_resultDto: Updatetest_resultDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.testResultRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: test_result['id']) {
    return this.testResultRepository.remove(id);
  }
}
