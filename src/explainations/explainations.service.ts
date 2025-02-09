import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExplainationDto } from './dto/create-explaination.dto';
import { UpdateExplainationDto } from './dto/update-explaination.dto';
import { ExplainationRepository } from './infrastructure/persistence/explaination.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Explaination } from './domain/explaination';
import { ChoicesService } from '../choices/choices.service';

@Injectable()
export class ExplainationsService {
  constructor(
    // Dependencies here
    private readonly explainationRepository: ExplainationRepository,
    private readonly choicesService: ChoicesService,
  ) {}

  async create(createExplainationDto: CreateExplainationDto) {
    // Do not remove comment below.
    // <creating-property />

    const choice = await this.choicesService.findById(
      createExplainationDto.choiceId,
    );

    if (!choice) throw new BadRequestException('Choice not found');

    return this.explainationRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      ...createExplainationDto,
      choice,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.explainationRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Explaination['id']) {
    return this.explainationRepository.findById(id);
  }

  findByIds(ids: Explaination['id'][]) {
    return this.explainationRepository.findByIds(ids);
  }

  async update(
    id: Explaination['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateExplainationDto: UpdateExplainationDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.explainationRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Explaination['id']) {
    return this.explainationRepository.remove(id);
  }
}
