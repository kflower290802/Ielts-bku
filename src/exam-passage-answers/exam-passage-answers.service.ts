import { Injectable } from '@nestjs/common';
import { CreateExamPassageAnswerDto } from './dto/create-exam-passage-answer.dto';
import { UpdateExamPassageAnswerDto } from './dto/update-exam-passage-answer.dto';
import { ExamPassageAnswerRepository } from './infrastructure/persistence/exam-passage-answer.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ExamPassageAnswer } from './domain/exam-passage-answer';

@Injectable()
export class ExamPassageAnswersService {
  constructor(
    private readonly examPassageAnswerRepository: ExamPassageAnswerRepository,
  ) {}

  async create(createExamPassageAnswerDto: CreateExamPassageAnswerDto) {
    return this.examPassageAnswerRepository.create(createExamPassageAnswerDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.examPassageAnswerRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: ExamPassageAnswer['id']) {
    return this.examPassageAnswerRepository.findById(id);
  }

  findByIds(ids: ExamPassageAnswer['id'][]) {
    return this.examPassageAnswerRepository.findByIds(ids);
  }

  async update(
    id: ExamPassageAnswer['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateExamPassageAnswerDto: UpdateExamPassageAnswerDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.examPassageAnswerRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: ExamPassageAnswer['id']) {
    return this.examPassageAnswerRepository.remove(id);
  }
}
