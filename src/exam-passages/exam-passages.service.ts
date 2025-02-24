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
import { ExamPassageQuestionsService } from '../exam-passage-questions/exam-passage-questions.service';

@Injectable()
export class ExamPassagesService {
  constructor(
    // Dependencies here
    private readonly examPassageRepository: ExamPassageRepository,
    @Inject(forwardRef(() => ExamsService))
    private readonly examsService: ExamsService,
    // @Inject(forwardRef(() => ExamPassagesService))
    private readonly examPassageQuestionService: ExamPassageQuestionsService,
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
  async findAllByExamId(id: Exam['id']) {
    const examPassages = await this.examPassageRepository.findByExamId(id);
    const examPassagesQuestions = examPassages.map(async (passage) => {
      const questions =
        await this.examPassageQuestionService.findByExamPassageId(passage.id);
      return {
        ...passage,
        questions,
      };
    });
    return Promise.all(examPassagesQuestions);
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
