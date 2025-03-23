import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePracticeDto } from './dto/create-practice.dto';
import { PracticeRepository } from './infrastructure/persistence/practice.repository';
import { Practice } from './domain/practice';
import { TopicsService } from '../topics/topics.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UsersService } from '../users/users.service';
import { UserPracticesService } from '../user-practices/user-practices.service';
import { PracticeType } from './pratices.type';
import { PracticeReadingsService } from '../practice-readings/practice-readings.service';
import { ExamStatus } from '../exams/exams.type';
import { QuestionType } from '../utils/types/question.type';
import { PracticeListensService } from '../practice-listens/practice-listens.service';
import { PracticeWritingsService } from '../practice-writings/practice-writings.service';
import { PracticeSpeakingQuestionsService } from '../practice-speaking-questions/practice-speaking-questions.service';

@Injectable()
export class PracticesService {
  constructor(
    private readonly practiceRepository: PracticeRepository,
    private readonly topicsService: TopicsService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly usersService: UsersService,
    private readonly userPracticesService: UserPracticesService,
    @Inject(forwardRef(() => PracticeReadingsService))
    private readonly practiceReadingsService: PracticeReadingsService,
    private readonly practiceListensService: PracticeListensService,
    private readonly practiceWritingsService: PracticeWritingsService,
    private readonly practiceSpeakingQuestionsService: PracticeSpeakingQuestionsService,
  ) {}

  async create(createPracticeDto: CreatePracticeDto) {
    const { topicId, image, ...rest } = createPracticeDto;
    const topic = await this.topicsService.findById(topicId);
    if (!topic) throw new NotFoundException('Topic not found');
    const { secure_url } = await this.cloudinaryService.uploadImage(image);
    return this.practiceRepository.create({
      topic,
      image: secure_url,
      ...rest,
    });
  }

  async findAllWithPagination({
    userId,
    status,
    topic,
    type,
    questionType,
  }: {
    userId: string;
    status?: ExamStatus;
    topic?: string;
    type?: PracticeType;
    questionType?: QuestionType;
  }) {
    const practices = await this.practiceRepository.findAllWithPagination({
      topic,
      type,
    });
    const practicesStatus = await Promise.all(
      practices.map(async (practice) => {
        const userExam =
          await this.userPracticesService.findByPracticeIdAndUserId(
            practice.id,
            userId,
          );
        const isIncludes = await this.practiceReadingsService.isIncludesTypes(
          practice.id,
          questionType,
        );
        return {
          ...practice,
          include: isIncludes,
          status: !userExam
            ? ExamStatus.NotStarted
            : !userExam.isCompleted
              ? ExamStatus.InProgress
              : ExamStatus.Completed,
        };
      }),
    );
    return practicesStatus.filter(
      (practice) =>
        (status ? practice.status === status : true) && practice.include,
    );
  }

  findById(id: Practice['id']) {
    return this.practiceRepository.findById(id);
  }

  findByIds(ids: Practice['id'][]) {
    return this.practiceRepository.findByIds(ids);
  }
  async startPractice(id: string, userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    const practice = await this.practiceRepository.findById(id);
    if (!practice) throw new NotFoundException('Practice not found');
    await this.userPracticesService.create({
      user,
      practice,
    });
    return;
  }

  async getUserPractice(id: string, userId: string) {
    console.log({ userId });
    const practice = await this.practiceRepository.findById(id);
    if (!practice) throw new NotFoundException('Practice not found');
    let practiceData = {} as any;
    if (practice.type === PracticeType.Reading) {
      practiceData = await this.practiceReadingsService.getPracticeData(id);
    }
    if (practice.type === PracticeType.Listening) {
      practiceData = await this.practiceListensService.getPracticeData(
        id,
        userId,
      );
    }
    if (practice.type === PracticeType.Writing) {
      practiceData = await this.practiceWritingsService.getPracticeData(
        id,
        userId,
      );
    }
    if (practice.type === PracticeType.Speaking) {
      practiceData =
        await this.practiceSpeakingQuestionsService.getPracticeData(id, userId);
    }
    return practiceData;
  }

  async submitPractice(id: string, userId: string) {
    const userPractice =
      await this.userPracticesService.findByPracticeIdAndUserId(id, userId);
    if (!userPractice) throw new NotFoundException('User practice  not found');
    return this.userPracticesService.update(id, { isCompleted: true });
  }
}
