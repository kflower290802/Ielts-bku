import { Injectable } from '@nestjs/common';
import { CreatePracticeListenQuestionDto } from './dto/create-practice-listen-question.dto';
import { PracticeListenQuestionRepository } from './infrastructure/persistence/practice-listen-question.repository';
import { PracticeListenQuestion } from './domain/practice-listen-question';
import { PracticeListenType } from '../practice-listen-types/domain/practice-listen-type';
import { PracticeListenAnswersService } from '../practice-listen-answers/practice-listen-answers.service';

@Injectable()
export class PracticeListenQuestionsService {
  constructor(
    private readonly practiceListenQuestionRepository: PracticeListenQuestionRepository,
    private readonly practiceListenAnswersService: PracticeListenAnswersService,
  ) {}

  async create(
    createPracticeListenQuestionDto: CreatePracticeListenQuestionDto,
  ) {
    const { typeId, answers, ...rest } = createPracticeListenQuestionDto;
    const type = new PracticeListenType();
    type.id = typeId;
    const question = await this.practiceListenQuestionRepository.create({
      type,
      ...rest,
    });
    const answersQuestion = await this.practiceListenAnswersService.createMany(
      answers.map((answer) => ({ ...answer, question })),
    );
    return { ...question, answers: answersQuestion };
  }

  findById(id: PracticeListenQuestion['id']) {
    return this.practiceListenQuestionRepository.findById(id);
  }

  findByIds(ids: PracticeListenQuestion['id'][]) {
    return this.practiceListenQuestionRepository.findByIds(ids);
  }
}
