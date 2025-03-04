import { Injectable } from '@nestjs/common';
import { CreatesuggestionDto } from './dto/create-suggestion.dto';
import { UpdatesuggestionDto } from './dto/update-suggestion.dto';
import { suggestionRepository } from './infrastructure/persistence/suggestion.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { suggestion } from './domain/suggestion';

@Injectable()
export class suggestionsService {
  constructor(private readonly suggestionRepository: suggestionRepository) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createsuggestionDto: CreatesuggestionDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.suggestionRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.suggestionRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: suggestion['id']) {
    return this.suggestionRepository.findById(id);
  }

  findByIds(ids: suggestion['id'][]) {
    return this.suggestionRepository.findByIds(ids);
  }

  async update(
    id: suggestion['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatesuggestionDto: UpdatesuggestionDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.suggestionRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: suggestion['id']) {
    return this.suggestionRepository.remove(id);
  }
}
