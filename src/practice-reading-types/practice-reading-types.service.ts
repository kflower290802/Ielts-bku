import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePracticeReadingTypeDto } from './dto/create-practice-reading-type.dto';
import { UpdatePracticeReadingTypeDto } from './dto/update-practice-reading-type.dto';
import { PracticeReadingTypeRepository } from './infrastructure/persistence/practice-reading-type.repository';
import { PracticeReadingType } from './domain/practice-reading-type';
import { PracticeReadingsService } from '../practice-readings/practice-readings.service';
import { PracticeReadingQuestionsService } from '../practice-reading-questions/practice-reading-questions.service';

@Injectable()
export class PracticeReadingTypesService {
  constructor(
    private readonly practiceReadingTypeRepository: PracticeReadingTypeRepository,
    @Inject(forwardRef(() => PracticeReadingsService))
    private readonly practiceReadingsService: PracticeReadingsService,
    private readonly practiceReadingQuestionsService: PracticeReadingQuestionsService,
  ) {}

  async create(createPracticeReadingTypeDto: CreatePracticeReadingTypeDto) {
    const { practiceReadingId, ...rest } = createPracticeReadingTypeDto;
    const practiceReading =
      await this.practiceReadingsService.findById(practiceReadingId);
    if (!practiceReading)
      throw new NotFoundException('Practice reading not found');
    return this.practiceReadingTypeRepository.create({
      practiceReading,
      ...rest,
    });
  }

  findById(id: PracticeReadingType['id']) {
    return this.practiceReadingTypeRepository.findById(id);
  }

  findByIds(ids: PracticeReadingType['id'][]) {
    return this.practiceReadingTypeRepository.findByIds(ids);
  }

  async findByPracticeReadingId(id: string) {
    const types =
      await this.practiceReadingTypeRepository.findByPracticeReadingId(id);
    return Promise.all(
      types.map(async (type) => {
        const questions =
          await this.practiceReadingQuestionsService.findByTypeId(type.id);
        return { type: type.type, questions, content: type.content };
      }),
    );
  }

  async update(
    id: PracticeReadingType['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatePracticeReadingTypeDto: UpdatePracticeReadingTypeDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.practiceReadingTypeRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: PracticeReadingType['id']) {
    return this.practiceReadingTypeRepository.remove(id);
  }
}
