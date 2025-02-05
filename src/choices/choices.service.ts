import { Injectable } from '@nestjs/common';
import { CreatechoiceDto } from './dto/create-choice.dto';
import { UpdatechoiceDto } from './dto/update-choice.dto';
import { choiceRepository } from './infrastructure/persistence/choice.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { choice } from './domain/choice';

@Injectable()
export class choicesService {
  constructor(
    // Dependencies here
    private readonly choiceRepository: choiceRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createchoiceDto: CreatechoiceDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.choiceRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.choiceRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: choice['id']) {
    return this.choiceRepository.findById(id);
  }

  findByIds(ids: choice['id'][]) {
    return this.choiceRepository.findByIds(ids);
  }

  async update(
    id: choice['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatechoiceDto: UpdatechoiceDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.choiceRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: choice['id']) {
    return this.choiceRepository.remove(id);
  }
}
