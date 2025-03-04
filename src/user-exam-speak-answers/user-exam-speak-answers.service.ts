import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserExamSpeakAnswerDto } from './dto/create-user-exam-speak-answer.dto';
import { UpdateUserExamSpeakAnswerDto } from './dto/update-user-exam-speak-answer.dto';
import { UserExamSpeakAnswerRepository } from './infrastructure/persistence/user-exam-speak-answer.repository';
import { UserExamSpeakAnswer } from './domain/user-exam-speak-answer';
import { UserExamsService } from '../user-exams/user-exams.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ExamSpeaksService } from '../exam-speaks/exam-speaks.service';

@Injectable()
export class UserExamSpeakAnswersService {
  constructor(
    private readonly userExamSpeakAnswerRepository: UserExamSpeakAnswerRepository,
    private readonly userExamsService: UserExamsService,
    private readonly cloudinaryService: CloudinaryService,
    @Inject(forwardRef(() => ExamSpeaksService))
    private readonly examSpeaksService: ExamSpeaksService,
  ) {}

  async create(createUserExamSpeakAnswerDto: CreateUserExamSpeakAnswerDto) {
    const { userExamId, answer, examSpeakId } = createUserExamSpeakAnswerDto;
    const userExam = await this.userExamsService.findById(userExamId);
    const { secure_url } = await this.cloudinaryService.uploadAudio(answer);
    if (!userExam) throw new NotFoundException('User not start this exam');
    const examSpeak = await this.examSpeaksService.findById(examSpeakId);
    if (!examSpeak) throw new NotFoundException('Question not found');
    return this.userExamSpeakAnswerRepository.create({
      examSpeak,
      userExam,
      answer: secure_url,
    });
  }

  findById(id: UserExamSpeakAnswer['id']) {
    return this.userExamSpeakAnswerRepository.findById(id);
  }

  findByIds(ids: UserExamSpeakAnswer['id'][]) {
    return this.userExamSpeakAnswerRepository.findByIds(ids);
  }

  findByQuestionIdAndUserExamId(userExamId: string, questionId: string) {
    return this.userExamSpeakAnswerRepository.findByQuestionIdAndUserExamId(
      questionId,
      userExamId,
    );
  }

  async update(
    id: UserExamSpeakAnswer['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateUserExamSpeakAnswerDto: UpdateUserExamSpeakAnswerDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.userExamSpeakAnswerRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: UserExamSpeakAnswer['id']) {
    return this.userExamSpeakAnswerRepository.remove(id);
  }

  async findByUserIdAndExamId(userId: string, examId: string) {
    const userExam = await this.userExamsService.findByUserIdAndExamId(
      userId,
      examId,
    );
    if (!userExam) throw new NotFoundException('user exam not start');
    return this.userExamSpeakAnswerRepository.findByUserExamId(userExam?.id);
  }
}
