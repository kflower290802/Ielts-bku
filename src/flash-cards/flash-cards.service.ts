import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateFlashCardDto } from './dto/create-flash-card.dto';
import { UpdateFlashCardDto } from './dto/update-flash-card.dto';
import { FlashCardRepository } from './infrastructure/persistence/flash-card.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FlashCard } from './domain/flash-card';
import { LessonsService } from '../lessons/lessons.service';

@Injectable()
export class FlashCardsService {
  constructor(
    private readonly flashCardRepository: FlashCardRepository,
    @Inject(forwardRef(() => LessonsService))
    private readonly lessonsServices: LessonsService,
  ) {}

  async create(createFlashCardDto: CreateFlashCardDto) {
    // Do not remove comment below.
    // <creating-property />
    const lesson = await this.lessonsServices.findById(
      createFlashCardDto.lessonId,
    );
    if (!lesson) throw new BadRequestException('lessonNotFound');

    return this.flashCardRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      ...createFlashCardDto,
      lesson,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.flashCardRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: FlashCard['id']) {
    return this.flashCardRepository.findById(id);
  }

  findByIds(ids: FlashCard['id'][]) {
    return this.flashCardRepository.findByIds(ids);
  }

  async update(
    id: FlashCard['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateFlashCardDto: UpdateFlashCardDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.flashCardRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: FlashCard['id']) {
    return this.flashCardRepository.remove(id);
  }
}
