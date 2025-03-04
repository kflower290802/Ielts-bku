import { Injectable } from '@nestjs/common';
import { CreatelearnerDto } from './dto/create-learner.dto';
import { UpdatelearnerDto } from './dto/update-learner.dto';
import { learnerRepository } from './infrastructure/persistence/learner.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { learner } from './domain/learner';

@Injectable()
export class learnersService {
  constructor(private readonly learnerRepository: learnerRepository) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createlearnerDto: CreatelearnerDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.learnerRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.learnerRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: learner['id']) {
    return this.learnerRepository.findById(id);
  }

  findByIds(ids: learner['id'][]) {
    return this.learnerRepository.findByIds(ids);
  }

  async update(
    id: learner['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatelearnerDto: UpdatelearnerDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.learnerRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: learner['id']) {
    return this.learnerRepository.remove(id);
  }
}
