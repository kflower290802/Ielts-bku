import { Injectable } from '@nestjs/common';
import { CreateexamDto } from './dto/create-exam.dto';
import { UpdateexamDto } from './dto/update-exam.dto';
import { examRepository } from './infrastructure/persistence/exam.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { exam } from './domain/exam';

@Injectable()
export class examsService {
  constructor(
    // Dependencies here
    private readonly examRepository: examRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createexamDto: CreateexamDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.examRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.examRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: exam['id']) {
    return this.examRepository.findById(id);
  }

  findByIds(ids: exam['id'][]) {
    return this.examRepository.findByIds(ids);
  }

  async update(
    id: exam['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateexamDto: UpdateexamDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.examRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: exam['id']) {
    return this.examRepository.remove(id);
  }
}
