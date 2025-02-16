import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExamPassageQuestionDto } from './dto/create-exam-passage-question.dto';
import { UpdateExamPassageQuestionDto } from './dto/update-exam-passage-question.dto';
import { ExamPassageQuestionRepository } from './infrastructure/persistence/exam-passage-question.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ExamPassageQuestion } from './domain/exam-passage-question';
import { ExamPassagesService } from '../exam-passages/exam-passages.service';

@Injectable()
export class ExamPassageQuestionsService {
  constructor(
    private readonly examPassageQuestionRepository: ExamPassageQuestionRepository,
    private readonly examPassageService: ExamPassagesService,
  ) {}

  async create(createExamPassageQuestionDto: CreateExamPassageQuestionDto) {
    // Do not remove comment below.
    // <creating-property />

    const { examPassageId, ...res } = createExamPassageQuestionDto;
    const examPassage = await this.examPassageService.findById(examPassageId);

    if (!examPassage) throw new BadRequestException('Exam Passage not found');

    return this.examPassageQuestionRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      examPassage,
      ...res,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.examPassageQuestionRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: ExamPassageQuestion['id']) {
    return this.examPassageQuestionRepository.findById(id);
  }

  findByIds(ids: ExamPassageQuestion['id'][]) {
    return this.examPassageQuestionRepository.findByIds(ids);
  }

  async update(
    id: ExamPassageQuestion['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateExamPassageQuestionDto: UpdateExamPassageQuestionDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.examPassageQuestionRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: ExamPassageQuestion['id']) {
    return this.examPassageQuestionRepository.remove(id);
  }
}
