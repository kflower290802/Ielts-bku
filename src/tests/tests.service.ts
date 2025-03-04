import { Injectable } from '@nestjs/common';
import { CreatetestDto } from './dto/create-test.dto';
import { UpdatetestDto } from './dto/update-test.dto';
import { testRepository } from './infrastructure/persistence/test.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { test } from './domain/test';

@Injectable()
export class testsService {
  constructor(private readonly testRepository: testRepository) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createtestDto: CreatetestDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.testRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.testRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: test['id']) {
    return this.testRepository.findById(id);
  }

  findByIds(ids: test['id'][]) {
    return this.testRepository.findByIds(ids);
  }

  async update(
    id: test['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatetestDto: UpdatetestDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.testRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: test['id']) {
    return this.testRepository.remove(id);
  }
}
