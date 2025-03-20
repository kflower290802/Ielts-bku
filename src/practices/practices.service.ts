import { Injectable } from '@nestjs/common';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { UpdatePracticeDto } from './dto/update-practice.dto';
import { PracticeRepository } from './infrastructure/persistence/practice.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Practice } from './domain/practice';

@Injectable()
export class PracticesService {
  constructor(private readonly practiceRepository: PracticeRepository) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createPracticeDto: CreatePracticeDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.practiceRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.practiceRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Practice['id']) {
    return this.practiceRepository.findById(id);
  }

  findByIds(ids: Practice['id'][]) {
    return this.practiceRepository.findByIds(ids);
  }

  async update(
    id: Practice['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatePracticeDto: UpdatePracticeDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.practiceRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Practice['id']) {
    return this.practiceRepository.remove(id);
  }
}
