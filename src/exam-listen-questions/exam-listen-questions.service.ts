import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExamListenQuestionDto } from './dto/create-exam-listen-question.dto';
import { ExamListenQuestionRepository } from './infrastructure/persistence/exam-listen-question.repository';
import { ExamListenQuestion } from './domain/exam-listen-question';
import { ExamListenAnswersService } from '../exam-listen-answers/exam-listen-answers.service';
import { ExamListenTypesService } from '../exam-listen-types/exam-listen-types.service';

@Injectable()
export class ExamListenQuestionsService {
  constructor(
    private readonly examListenQuestionRepository: ExamListenQuestionRepository,
    @Inject(forwardRef(() => ExamListenAnswersService))
    private readonly examListenAnswersService: ExamListenAnswersService,
    @Inject(forwardRef(() => ExamListenTypesService))
    private readonly examListenTypesService: ExamListenTypesService,
  ) {}

  async create(createExamListenQuestionDto: CreateExamListenQuestionDto) {
    const { examListenTypeId, answers, ...rest } = createExamListenQuestionDto;
    const examListenType =
      await this.examListenTypesService.findById(examListenTypeId);

    if (!examListenType)
      throw new NotFoundException('Exam listen type not found');

    const question = await this.examListenQuestionRepository.create({
      examListenType,
      ...rest,
    });
    const answerQuestions = await Promise.all(
      answers.map(async (answer) => {
        const { answer: title, isCorrect } = answer;
        const answerQuestion = await this.examListenAnswersService.create({
          examListenQuestionId: question.id,
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

  findById(id: ExamListenQuestion['id']) {
    return this.examListenQuestionRepository.findById(id);
  }

  findByIds(ids: ExamListenQuestion['id'][]) {
    return this.examListenQuestionRepository.findByIds(ids);
  }

  remove(id: ExamListenQuestion['id']) {
    return this.examListenQuestionRepository.remove(id);
  }

  async findByExamSection(sectionId: string) {
    const questionSection =
      await this.examListenQuestionRepository.findBySectionId(sectionId);
    const questions = await Promise.all(
      questionSection.map(async (question) => {
        const answers = await this.examListenAnswersService.findByQuestionId(
          question.id,
        );
        return {
          ...question,
          answers,
        };
      }),
    );
    return questions;
  }

  findByExamTypeId(id: string) {
    return this.examListenQuestionRepository.findByExamTypeId(id);
  }
}
