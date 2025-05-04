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
import { ExamReadingTypesService } from '../exam-reading-types/exam-reading-types.service';
import { User } from '../users/domain/user';
@Injectable()
export class ExamPassagesService {
  constructor(
    private readonly examPassageRepository: ExamPassageRepository,
    @Inject(forwardRef(() => ExamsService))
    private readonly examsService: ExamsService,
    private readonly examReadingTypesService: ExamReadingTypesService,
  ) {}

  async create(createExamPassageDto: CreateExamPassageDto) {
    const { examId, ...rest } = createExamPassageDto;
    const exam = await this.examsService.findById(examId);

    if (!exam) throw new BadRequestException('Exam not found!');

    return this.examPassageRepository.create({
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
  async findAllByExamIdAndUserId(id: Exam['id'], userId: User['id']) {
    const examPassages = await this.examPassageRepository.findByExamId(id);
    return Promise.all(
      examPassages.map(async (passage) => {
        const examPassageTypes =
          await this.examReadingTypesService.findByPassageIdWithQuestion(
            passage.id,
            userId,
            id,
          );
        return { ...passage, types: examPassageTypes };
      }),
    );
  }

  findById(id: ExamPassage['id']) {
    return this.examPassageRepository.findById(id);
  }

  findByIds(ids: ExamPassage['id'][]) {
    return this.examPassageRepository.findByIds(ids);
  }

  async update(
    id: ExamPassage['id'],
    updateExamPassageDto: UpdateExamPassageDto,
  ) {
    return this.examPassageRepository.update(id, updateExamPassageDto);
  }

  remove(id: ExamPassage['id']) {
    return this.examPassageRepository.remove(id);
  }

  async findAllByExamId(id: Exam['id']) {
    const examPassages = await this.examPassageRepository.findByExamId(id);
    return Promise.all(
      examPassages.map(async (passage) => {
        const examPassageTypes =
          await this.examReadingTypesService.findByPassageIdWithQuestionAndAnswer(
            passage.id,
          );
        return { ...passage, types: examPassageTypes };
      }),
    );
  }
}
