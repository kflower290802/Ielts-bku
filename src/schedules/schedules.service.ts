import { Injectable } from '@nestjs/common';
import { CreatescheduleDto } from './dto/create-schedule.dto';
import { UpdatescheduleDto } from './dto/update-schedule.dto';
import { scheduleRepository } from './infrastructure/persistence/schedule.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { schedule } from './domain/schedule';

@Injectable()
export class schedulesService {
  constructor(private readonly scheduleRepository: scheduleRepository) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createscheduleDto: CreatescheduleDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.scheduleRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.scheduleRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: schedule['id']) {
    return this.scheduleRepository.findById(id);
  }

  findByIds(ids: schedule['id'][]) {
    return this.scheduleRepository.findByIds(ids);
  }

  async update(
    id: schedule['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatescheduleDto: UpdatescheduleDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.scheduleRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: schedule['id']) {
    return this.scheduleRepository.remove(id);
  }
}
