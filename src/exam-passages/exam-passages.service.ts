import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateExamPassageDto } from './dto/create-exam-passage.dto';
import { UpdateExamPassageDto } from './dto/update-exam-passage.dto';
import { ExamPassageRepository } from './infrastructure/persistence/exam-passage.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ExamPassage } from './domain/exam-passage';
import { ExamsService } from '../exams/exams.service';
import { Exam } from '../exams/domain/exam';

@Injectable()
export class ExamPassagesService {
  constructor(
    // Dependencies here
    private readonly examPassageRepository: ExamPassageRepository,
    @Inject(forwardRef(() => ExamsService))
    private readonly examsService: ExamsService,
  ) {}

  async create(createExamPassageDto: CreateExamPassageDto) {
    // Do not remove comment below.
    // <creating-property />

    const { examId, ...rest } = createExamPassageDto;
    const exam = await this.examsService.findById(examId);

    if (!exam) throw new BadRequestException('Exam not found!');

    return this.examPassageRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      exam,
      ...rest,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.examPassageRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findAllByExamId(id: Exam['id']) {
    return this.examPassageRepository.findByExamId(id);
  }

  findById(id: ExamPassage['id']) {
    return this.examPassageRepository.findById(id);
  }

  findByIds(ids: ExamPassage['id'][]) {
    return this.examPassageRepository.findByIds(ids);
  }

  async update(
    id: ExamPassage['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateExamPassageDto: UpdateExamPassageDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.examPassageRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: ExamPassage['id']) {
    return this.examPassageRepository.remove(id);
  }
}
