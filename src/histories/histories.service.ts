import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { HistoryRepository } from './infrastructure/persistence/history.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { History } from './domain/history';

@Injectable()
export class HistoriesService {
  constructor(private readonly historyRepository: HistoryRepository) {}

  async create(createHistoryDto: CreateHistoryDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.historyRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      ...createHistoryDto,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.historyRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: History['id']) {
    return this.historyRepository.findById(id);
  }

  findByIds(ids: History['id'][]) {
    return this.historyRepository.findByIds(ids);
  }

  async update(
    id: History['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateHistoryDto: UpdateHistoryDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.historyRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: History['id']) {
    return this.historyRepository.remove(id);
  }
}
