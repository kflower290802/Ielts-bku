import { Injectable } from '@nestjs/common';
import { CreateunitDto } from './dto/create-unit.dto';
import { UpdateunitDto } from './dto/update-unit.dto';
import { unitRepository } from './infrastructure/persistence/unit.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { unit } from './domain/unit';

@Injectable()
export class unitsService {
  constructor(private readonly unitRepository: unitRepository) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createunitDto: CreateunitDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.unitRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.unitRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: unit['id']) {
    return this.unitRepository.findById(id);
  }

  findByIds(ids: unit['id'][]) {
    return this.unitRepository.findByIds(ids);
  }

  async update(
    id: unit['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateunitDto: UpdateunitDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.unitRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: unit['id']) {
    return this.unitRepository.remove(id);
  }
}
