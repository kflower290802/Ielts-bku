import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamPassageQuestionDto } from './dto/create-exam-passage-question.dto';
import { UpdateExamPassageQuestionDto } from './dto/update-exam-passage-question.dto';
import { ExamPassageQuestionRepository } from './infrastructure/persistence/exam-passage-question.repository';
import { ExamPassageQuestion } from './domain/exam-passage-question';
import { ExamPassage } from '../exam-passages/domain/exam-passage';
import { ExamPassageAnswersService } from '../exam-passage-answers/exam-passage-answers.service';
import { ExamReadingTypesService } from '../exam-reading-types/exam-reading-types.service';

@Injectable()
export class ExamPassageQuestionsService {
  constructor(
    private readonly examPassageQuestionRepository: ExamPassageQuestionRepository,
    private readonly examPassageAnswersService: ExamPassageAnswersService,
    private readonly examReadingTypesService: ExamReadingTypesService,
  ) {}

  async create(createExamPassageQuestionDto: CreateExamPassageQuestionDto) {
    const { answers, examReadingTypeId, ...rest } =
      createExamPassageQuestionDto;

    const examReadingType =
      await this.examReadingTypesService.findById(examReadingTypeId);

    if (!examReadingType) throw new NotFoundException('Type not found');

    const question = await this.examPassageQuestionRepository.create({
      examReadingType,
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

  findByExamTypeId(id: ExamPassage['id']) {
    return this.examPassageQuestionRepository.findByExamTypeId(id);
  }
}
