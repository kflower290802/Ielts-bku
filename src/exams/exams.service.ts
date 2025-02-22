import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ExamRepository } from './infrastructure/persistence/exam.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Exam } from './domain/exam';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ExamStatus, ExamType } from './exams.type';
import { ExamPassagesService } from '../exam-passages/exam-passages.service';
import { UserExamsService } from '../user-exams/user-exams.service';
import { User } from '../users/domain/user';
import { UserExamSessionsService } from '../user-exam-sessions/user-exam-sessions.service';
import { UserExam } from '../user-exams/domain/user-exam';
import { NullableType } from '../utils/types/nullable.type';

@Injectable()
export class ExamsService {
  constructor(
    private readonly examRepository: ExamRepository,
    private readonly cloudinaryService: CloudinaryService,
    @Inject(forwardRef(() => ExamPassagesService))
    private readonly examPassagesService: ExamPassagesService,
    @Inject(forwardRef(() => UserExamsService))
    private readonly userExamsService: UserExamsService,
    private readonly userExamSessionService: UserExamSessionsService,
  ) {}

  async create(createExamDto: CreateExamDto) {
    const { secure_url } = await this.cloudinaryService.uploadImage(
      createExamDto.file,
    );
    return this.examRepository.create({
      ...createExamDto,
      image: secure_url,
    });
  }

  findAllWithPagination({
    paginationOptions,
    type,
    status,
    userId,
    year,
  }: {
    paginationOptions: IPaginationOptions;
    type?: ExamType;
    status?: ExamStatus;
    userId: string;
    year?: number;
  }) {
    return this.examRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      type,
      status,
      userId,
      year,
    });
  }

  findById(id: Exam['id']) {
    return this.examRepository.findById(id);
  }

  findByIds(ids: Exam['id'][]) {
    return this.examRepository.findByIds(ids);
  }

  async update(
    id: Exam['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateExamDto: UpdateExamDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.examRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Exam['id']) {
    return this.examRepository.remove(id);
  }

  async findAllPassage(id: Exam['id']) {
    const exam = await this.examRepository.findById(id);
    const examPassage = await this.examPassagesService.findAllByExamId(id);
    return {
      ...exam,
      examPassage,
    };
  }

  findYearsExam() {
    return this.examRepository.findYearsExam();
  }

  async getRemainingTime(userExamId: string): Promise<number> {
    const userExam = await this.userExamsService.findById(userExamId);
    if (!userExam) {
      throw new BadRequestException('User exam not found');
    }

    const exam = await this.examRepository.findById(userExam.exam.id);
    if (!exam) {
      throw new BadRequestException('Exam not found');
    }

    const totalTimeSpent =
      await this.userExamSessionService.getTotalTimeSpent(userExamId);

    const remainingTime = exam.time - totalTimeSpent;

    return remainingTime > 0 ? remainingTime : 0;
  }

  async startExam(id: Exam['id'], userId: User['id']) {
    let userExam: NullableType<UserExam> = null;
    userExam = await this.userExamsService.findByUserIdAndExamId(userId, id);
    if (!userExam) {
      userExam = await this.userExamsService.create({
        examId: id,
        userId,
        progress: 0,
        score: 0,
      });
    }
    const userExamSession = await this.userExamSessionService.findByExamUserId(
      userExam.id,
    );
    if (!userExamSession || userExamSession.endTime) {
      await this.userExamSessionService.create({
        startTime: new Date(),
        examUserId: userExam.id,
      });
    }
  }

  async getExamData(id: Exam['id'], userId: User['id']) {
    const exam = await this.examRepository.findById(id);
    const userExam = await this.userExamsService.findByUserIdAndExamId(
      userId,
      id,
    );
    if (!userExam) throw new NotFoundException('User exam not found');
    const remainingTime = await this.getRemainingTime(userExam.id);
    return {
      exam,
      remainingTime,
    };
  }
  async exitExam(id: Exam['id'], userId: User['id']) {
    const exam = await this.examRepository.findById(id);
    if (!exam) throw new NotFoundException('Exam not found');
    const now = new Date();
    const userExam = await this.userExamsService.findByUserIdAndExamId(
      userId,
      id,
    );
    if (!userExam) {
      throw new NotFoundException('User exam not found');
    }
    const userExamSession = await this.userExamSessionService.findByExamUserId(
      userExam.id,
    );

    if (!userExamSession) {
      throw new BadRequestException('This exam is not started!');
    }
    await this.userExamSessionService.update(userExamSession.id, {
      endTime: now,
    });
    const timeSpent = await this.userExamSessionService.getTotalTimeSpent(
      userExam.id,
    );
    await this.userExamsService.update(userExam.id, {
      progress: timeSpent / exam.time > 1 ? 100 : (timeSpent / exam.time) * 100,
    });
  }
}
