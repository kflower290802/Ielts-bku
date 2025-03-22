import { Injectable } from '@nestjs/common';
import { CreatePracticeListenTypeDto } from './dto/create-practice-listen-type.dto';
import { UpdatePracticeListenTypeDto } from './dto/update-practice-listen-type.dto';
import { PracticeListenTypeRepository } from './infrastructure/persistence/practice-listen-type.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { PracticeListenType } from './domain/practice-listen-type';
import { PracticeListen } from '../practice-listens/domain/practice-listen';

@Injectable()
export class PracticeListenTypesService {
  constructor(
    private readonly practiceListenTypeRepository: PracticeListenTypeRepository,
  ) {}

  async create(createPracticeListenTypeDto: CreatePracticeListenTypeDto) {
    const practiceListen = new PracticeListen();
    const { practiceListenId, ...rest } = createPracticeListenTypeDto;
    practiceListen.id = practiceListenId;
    return this.practiceListenTypeRepository.create({
      practiceListen,
      ...rest,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.practiceListenTypeRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: PracticeListenType['id']) {
    return this.practiceListenTypeRepository.findById(id);
  }

  findByIds(ids: PracticeListenType['id'][]) {
    return this.practiceListenTypeRepository.findByIds(ids);
  }

  async update(
    id: PracticeListenType['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatePracticeListenTypeDto: UpdatePracticeListenTypeDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.practiceListenTypeRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: PracticeListenType['id']) {
    return this.practiceListenTypeRepository.remove(id);
  }
}
