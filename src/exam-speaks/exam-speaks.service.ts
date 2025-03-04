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
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ExamsService } from '../exams/exams.service';
import { UserExamSpeakAnswersService } from '../user-exam-speak-answers/user-exam-speak-answers.service';
import { UserExamsService } from '../user-exams/user-exams.service';

@Injectable()
export class ExamSpeaksService {
  constructor(
    private readonly examSpeakRepository: ExamSpeakRepository,
    private readonly cloudinaryService: CloudinaryService,
    @Inject(forwardRef(() => ExamsService))
    private readonly examsService: ExamsService,
    @Inject(forwardRef(() => UserExamSpeakAnswersService))
    private readonly userExamSpeakSAnswerService: UserExamSpeakAnswersService,
    private readonly userExamsService: UserExamsService,
  ) {}

  async create(createExamSpeakDto: CreateExamSpeakDto) {
    const { question, examId } = createExamSpeakDto;
    const { secure_url } = await this.cloudinaryService.uploadAudio(
      createExamSpeakDto.audio,
    );
    const exam = await this.examsService.findById(examId);
    if (!exam) throw new NotFoundException('Exam not found');
    return this.examSpeakRepository.create({
      audio: secure_url,
      question,
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

  async findByUserIdAndExamId(userId: string, examId: string) {
    const examSpeakQuestions =
      await this.examSpeakRepository.findByExamId(examId);
    const userExam = await this.userExamsService.findByUserIdAndExamId(
      userId,
      examId,
    );
    if (!userExam) throw new NotFoundException('User exam not found');
    return Promise.all(
      examSpeakQuestions.map(async (question) => {
        const answer =
          await this.userExamSpeakSAnswerService.findByQuestionIdAndUserExamId(
            userExam.id,
            question.id,
          );
        return {
          ...question,
          answer,
        };
      }),
    );
  }

  findByExamId(examId: string) {
    return this.examSpeakRepository.findByExamId(examId);
  }
}
