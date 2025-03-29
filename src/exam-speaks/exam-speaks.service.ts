import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExamSpeakDto } from './dto/create-exam-speak.dto';
import { UpdateExamSpeakDto } from './dto/update-exam-speak.dto';
import { ExamSpeakRepository } from './infrastructure/persistence/exam-speak.repository';
import { ExamSpeak } from './domain/exam-speak';
import { ExamsService } from '../exams/exams.service';
import { ExamSpeakPartsService } from '../exam-speak-parts/exam-speak-parts.service';
import { ExamSpeakQuestionsService } from '../exam-speak-questions/exam-speak-questions.service';
import { UserExamSpeakAnswersService } from '../user-exam-speak-answers/user-exam-speak-answers.service';
@Injectable()
export class ExamSpeaksService {
  constructor(
    private readonly examSpeakRepository: ExamSpeakRepository,
    @Inject(forwardRef(() => ExamsService))
    private readonly examsService: ExamsService,
    private readonly examSpeakPartsService: ExamSpeakPartsService,
    private readonly examSpeakQuestionsService: ExamSpeakQuestionsService,
    private readonly userExamSpeakAnswersService: UserExamSpeakAnswersService,
  ) {}

  async create(createExamSpeakDto: CreateExamSpeakDto) {
    const { examId } = createExamSpeakDto;
    const exam = await this.examsService.findById(examId);
    if (!exam) throw new NotFoundException('Exam not found');
    return this.examSpeakRepository.create({
      exam,
    });
  }

  findById(id: ExamSpeak['id']) {
    return this.examSpeakRepository.findById(id);
  }

  findByIds(ids: ExamSpeak['id'][]) {
    return this.examSpeakRepository.findByIds(ids);
  }

  async update(
    id: ExamSpeak['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateExamSpeakDto: UpdateExamSpeakDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.examSpeakRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: ExamSpeak['id']) {
    return this.examSpeakRepository.remove(id);
  }

  async findAllByExamId(examId: string, userId: string) {
    const examSpeak = await this.examSpeakRepository.findByExamId(examId);
    if (!examSpeak) throw new NotFoundException('Exam speak not found');
    const [parts, answers] = await Promise.all([
      this.examSpeakPartsService.findAllByExamId(examSpeak.id),
      this.userExamSpeakAnswersService.findByUserIdAndExamId(userId, examId),
    ]);
    return Promise.all(
      parts.map(async (part) => {
        const questions = await this.examSpeakQuestionsService.findAllByPartId(
          part.id,
        );
        return {
          ...part,
          questions: questions.map((question) => {
            return {
              ...question,
              answer:
                answers.find((answer) => answer.question.id === question.id)
                  ?.answer || '',
            };
          }),
        };
      }),
    );
  }
}
