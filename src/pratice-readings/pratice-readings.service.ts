import { Injectable } from '@nestjs/common';
import { CreatePraticeReadingDto } from './dto/create-pratice-reading.dto';
import { UpdatePraticeReadingDto } from './dto/update-pratice-reading.dto';
import { PraticeReadingRepository } from './infrastructure/persistence/pratice-reading.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { PraticeReading } from './domain/pratice-reading';

@Injectable()
export class PraticeReadingsService {
  constructor(
    private readonly praticeReadingRepository: PraticeReadingRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createPraticeReadingDto: CreatePraticeReadingDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.praticeReadingRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.praticeReadingRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: PraticeReading['id']) {
    return this.praticeReadingRepository.findById(id);
  }

  findByIds(ids: PraticeReading['id'][]) {
    return this.praticeReadingRepository.findByIds(ids);
  }

  async update(
    id: PraticeReading['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatePraticeReadingDto: UpdatePraticeReadingDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.praticeReadingRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: PraticeReading['id']) {
    return this.praticeReadingRepository.remove(id);
  }
}
