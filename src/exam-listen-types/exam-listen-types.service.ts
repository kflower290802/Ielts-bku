import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExamListenTypeDto } from './dto/create-exam-listen-type.dto';
import { ExamListenTypeRepository } from './infrastructure/persistence/exam-listen-type.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ExamListenType } from './domain/exam-listen-type';
import { ExamListenSectionsService } from '../exam-listen-sections/exam-listen-sections.service';
import { ExamListenQuestionsService } from '../exam-listen-questions/exam-listen-questions.service';
import { ExamListenAnswersService } from '../exam-listen-answers/exam-listen-answers.service';
import { User } from '../users/domain/user';
import { UserExamListenAnswersService } from '../user-exam-listen-answers/user-exam-listen-answers.service';
import { UpdateExamListenTypeDto } from './dto/update-exam-listen-type.dto';

@Injectable()
export class ExamListenTypesService {
  constructor(
    private readonly examListenTypeRepository: ExamListenTypeRepository,
    @Inject(forwardRef(() => ExamListenSectionsService))
    private readonly examListenSectionsService: ExamListenSectionsService,
    @Inject(forwardRef(() => ExamListenQuestionsService))
    private readonly examListenQuestionsService: ExamListenQuestionsService,
    @Inject(forwardRef(() => ExamListenAnswersService))
    private readonly examListenAnswersService: ExamListenAnswersService,
    @Inject(forwardRef(() => UserExamListenAnswersService))
    private readonly userExamListenAnswersService: UserExamListenAnswersService,
  ) {}

  async create(createExamListenTypeDto: CreateExamListenTypeDto) {
    const { examSectionId, ...rest } = createExamListenTypeDto;
    const examSection =
      await this.examListenSectionsService.findById(examSectionId);
    if (!examSection) throw new NotFoundException('Exam section not found');

    return this.examListenTypeRepository.create({
      examSection,
      ...rest,
    });
  }

  update(
    id: ExamListenType['id'],
    updateExamListenTypeDto: UpdateExamListenTypeDto,
  ) {
    return this.examListenTypeRepository.update(id, updateExamListenTypeDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.examListenTypeRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: ExamListenType['id']) {
    return this.examListenTypeRepository.findById(id);
  }

  findByIds(ids: ExamListenType['id'][]) {
    return this.examListenTypeRepository.findByIds(ids);
  }

  remove(id: ExamListenType['id']) {
    return this.examListenTypeRepository.remove(id);
  }

  async findByPassageIdWithQuestion(
    id: string,
    userId: User['id'],
    examId: string,
  ) {
    const types = await this.examListenTypeRepository.findBySectionId(id);
    const userExamAnswers =
      await this.userExamListenAnswersService.findByUserIdAndExamId(
        userId,
        examId,
      );
    const questions = await Promise.all(
      types.map(async (type) => {
        const questions =
          await this.examListenQuestionsService.findByExamTypeId(type.id);
        const questionWithAnswers = await Promise.all(
          questions.map(async (question) => {
            const answers =
              await this.examListenAnswersService.findByQuestionId(question.id);
            const answer = userExamAnswers.find(
              (answer) => answer.examPassageQuestion.id === question.id,
            );
            return { ...question, answers, answer };
          }),
        );
        return { ...type, questions: questionWithAnswers };
      }),
    );
    return questions;
  }

  async findByPassageIdWithQuestionAndAnswer(id: string) {
    const types = await this.examListenTypeRepository.findBySectionId(id);
    const questions = await Promise.all(
      types.map(async (type) => {
        const questions =
          await this.examListenQuestionsService.findByExamTypeId(type.id);
        const questionWithAnswers = await Promise.all(
          questions.map(async (question) => {
            const answers =
              await this.examListenAnswersService.findByQuestionId(question.id);
            return { ...question, answers };
          }),
        );
        return { ...type, questions: questionWithAnswers };
      }),
    );
    return questions;
  }
}
