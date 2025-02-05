import { Injectable } from '@nestjs/common';
import { CreatenoteDto } from './dto/create-note.dto';
import { UpdatenoteDto } from './dto/update-note.dto';
import { noteRepository } from './infrastructure/persistence/note.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { note } from './domain/note';

@Injectable()
export class notesService {
  constructor(
    // Dependencies here
    private readonly noteRepository: noteRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createnoteDto: CreatenoteDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.noteRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.noteRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: note['id']) {
    return this.noteRepository.findById(id);
  }

  findByIds(ids: note['id'][]) {
    return this.noteRepository.findByIds(ids);
  }

  async update(
    id: note['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatenoteDto: UpdatenoteDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.noteRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: note['id']) {
    return this.noteRepository.remove(id);
  }
}
