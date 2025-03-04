import { Injectable } from '@nestjs/common';
import { CreateChoiceDto } from './dto/create-choice.dto';
import { UpdateChoiceDto } from './dto/update-choice.dto';
import { ChoiceRepository } from './infrastructure/persistence/choice.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Choice } from './domain/choice';

@Injectable()
export class ChoicesService {
  constructor(private readonly choiceRepository: ChoiceRepository) {}

  create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createChoiceDto: CreateChoiceDto,
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

  findById(id: Choice['id']) {
    return this.choiceRepository.findById(id);
  }

  findByIds(ids: Choice['id'][]) {
    return this.choiceRepository.findByIds(ids);
  }

  async update(
    id: Choice['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateChoiceDto: UpdateChoiceDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.choiceRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Choice['id']) {
    return this.choiceRepository.remove(id);
  }
}
