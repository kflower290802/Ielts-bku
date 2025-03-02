import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExamListenQuestionDto } from './dto/create-exam-listen-question.dto';
import { UpdateExamListenQuestionDto } from './dto/update-exam-listen-question.dto';
import { ExamListenQuestionRepository } from './infrastructure/persistence/exam-listen-question.repository';
import { ExamListenQuestion } from './domain/exam-listen-question';
import { ExamListenSectionsService } from '../exam-listen-sections/exam-listen-sections.service';
import { ExamListenAnswersService } from '../exam-listen-answers/exam-listen-answers.service';

@Injectable()
export class ExamListenQuestionsService {
  constructor(
    private readonly examListenQuestionRepository: ExamListenQuestionRepository,
    @Inject(forwardRef(() => ExamListenSectionsService))
    private readonly examListenSectionsService: ExamListenSectionsService,
    @Inject(forwardRef(() => ExamListenAnswersService))
    private readonly examListenAnswersService: ExamListenAnswersService,
  ) {}

  async create(createExamListenQuestionDto: CreateExamListenQuestionDto) {
    const { examListenSectionId, ...rest } = createExamListenQuestionDto;
    const examListenSection =
      await this.examListenSectionsService.findById(examListenSectionId);

    if (!examListenSection)
      throw new NotFoundException('Exam listen section not found');

    return this.examListenQuestionRepository.create({
      examListenSection,
      ...rest,
    });
  }

  findById(id: ExamListenQuestion['id']) {
    return this.examListenQuestionRepository.findById(id);
  }

  findByIds(ids: ExamListenQuestion['id'][]) {
    return this.examListenQuestionRepository.findByIds(ids);
  }

  async update(
    id: ExamListenQuestion['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateExamListenQuestionDto: UpdateExamListenQuestionDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.examListenQuestionRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
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
}
