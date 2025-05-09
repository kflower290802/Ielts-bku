import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePracticeReadingQuestionDto } from './dto/create-practice-reading-question.dto';
import { UpdatePracticeReadingQuestionDto } from './dto/update-practice-reading-question.dto';
import { PracticeReadingQuestionRepository } from './infrastructure/persistence/practice-reading-question.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { PracticeReadingQuestion } from './domain/practice-reading-question';
import { PracticeReadingTypesService } from '../practice-reading-types/practice-reading-types.service';
import { PracticeReadingAnswersService } from '../practice-reading-answers/practice-reading-answers.service';

@Injectable()
export class PracticeReadingQuestionsService {
  constructor(
    private readonly practiceReadingQuestionRepository: PracticeReadingQuestionRepository,
    @Inject(forwardRef(() => PracticeReadingTypesService))
    private readonly practiceReadingTypesService: PracticeReadingTypesService,
    private readonly practiceReadingAnswersService: PracticeReadingAnswersService,
  ) {}

  async create(
    createPracticeReadingQuestionDto: CreatePracticeReadingQuestionDto,
  ) {
    const { practiceReadingTypeId, answers, ...rest } =
      createPracticeReadingQuestionDto;
    const practiceReadingType = await this.practiceReadingTypesService.findById(
      practiceReadingTypeId,
    );
    if (!practiceReadingType) throw new NotFoundException('Type not found');
    const question = await this.practiceReadingQuestionRepository.create({
      type: practiceReadingType,
      ...rest,
    });
    const answersQuestion = answers.map((answer) => ({
      ...answer,
      question,
    }));
    const answersDomain =
      await this.practiceReadingAnswersService.createMany(answersQuestion);
    return { ...question, answersDomain };
  }

  async update(
    id: PracticeReadingQuestion['id'],
    updatePracticeReadingQuestionDto: UpdatePracticeReadingQuestionDto,
  ) {
    const { answers, ...rest } = updatePracticeReadingQuestionDto;

    const updateAnswers = answers.map((answer) =>
      this.practiceReadingAnswersService.update(answer.id, answer),
    );

    await Promise.all(updateAnswers);

    return this.practiceReadingQuestionRepository.update(id, rest);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.practiceReadingQuestionRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: PracticeReadingQuestion['id']) {
    return this.practiceReadingQuestionRepository.findById(id);
  }

  findByIds(ids: PracticeReadingQuestion['id'][]) {
    return this.practiceReadingQuestionRepository.findByIds(ids);
  }

  remove(id: PracticeReadingQuestion['id']) {
    return this.practiceReadingQuestionRepository.remove(id);
  }

  async findByTypeId(id: string) {
    const questions =
      await this.practiceReadingQuestionRepository.findByTypeId(id);
    return Promise.all(
      questions.map(async (question) => {
        const answers =
          await this.practiceReadingAnswersService.findByQuestionId(
            question.id,
          );
        return { ...question, answers };
      }),
    );
  }
}
