import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateExamPassageQuestionDto } from './dto/create-exam-passage-question.dto';
import { UpdateExamPassageQuestionDto } from './dto/update-exam-passage-question.dto';
import { ExamPassageQuestionRepository } from './infrastructure/persistence/exam-passage-question.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ExamPassageQuestion } from './domain/exam-passage-question';
import { ExamPassagesService } from '../exam-passages/exam-passages.service';
import { ExamPassage } from '../exam-passages/domain/exam-passage';
import { ExamPassageAnswersService } from '../exam-passage-answers/exam-passage-answers.service';

@Injectable()
export class ExamPassageQuestionsService {
  constructor(
    private readonly examPassageQuestionRepository: ExamPassageQuestionRepository,
    @Inject(forwardRef(() => ExamPassagesService))
    private readonly examPassageService: ExamPassagesService,
    private readonly examPassageAnswersService: ExamPassageAnswersService,
  ) {}

  async create(createExamPassageQuestionDto: CreateExamPassageQuestionDto) {
    const { examPassageId, answers, ...rest } = createExamPassageQuestionDto;
    const examPassage = await this.examPassageService.findById(examPassageId);

    if (!examPassage) throw new BadRequestException('Exam Passage not found');
    const question = await this.examPassageQuestionRepository.create({
      examPassage,
      ...rest,
    });

    const answerQuestions = await Promise.all(
      answers.map(async (answer) => {
        const { answer: title, isCorrect } = answer;
        const answerQuestion = await this.examPassageAnswersService.create({
          question,
          answer: title,
          isCorrect,
        });
        return answerQuestion;
      }),
    );

    return {
      ...question,
      answers: answerQuestions,
    };
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

  findByExamPassageId(id: ExamPassage['id']) {
    return this.examPassageQuestionRepository.findByExamPassageId(id);
  }
}
