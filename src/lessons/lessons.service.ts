import { Injectable } from '@nestjs/common';
import { CreatelessonDto } from './dto/create-lesson.dto';
import { UpdatelessonDto } from './dto/update-lesson.dto';
import { lessonRepository } from './infrastructure/persistence/lesson.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { lesson } from './domain/lesson';

@Injectable()
export class lessonsService {
  constructor(
    // Dependencies here
    private readonly lessonRepository: lessonRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createlessonDto: CreatelessonDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.lessonRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.lessonRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: lesson['id']) {
    return this.lessonRepository.findById(id);
  }

  findByIds(ids: lesson['id'][]) {
    return this.lessonRepository.findByIds(ids);
  }

  async update(
    id: lesson['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatelessonDto: UpdatelessonDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.lessonRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: lesson['id']) {
    return this.lessonRepository.remove(id);
  }
}
