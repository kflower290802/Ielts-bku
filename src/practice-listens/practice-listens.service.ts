import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePracticeListenDto } from './dto/create-practice-listen.dto';
import { PracticeListenRepository } from './infrastructure/persistence/practice-listen.repository';
import { PracticeListen } from './domain/practice-listen';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Practice } from '../practices/domain/practice';
import { PracticeListenTypesService } from '../practice-listen-types/practice-listen-types.service';
import { UserPracticesService } from '../user-practices/user-practices.service';
import { UserPracticeListenAnswersService } from '../user-practice-listen-answers/user-practice-listen-answers.service';

@Injectable()
export class PracticeListensService {
  constructor(
    private readonly practiceListenRepository: PracticeListenRepository,
    private readonly cloudinaryService: CloudinaryService,
    private readonly practiceListenTypesService: PracticeListenTypesService,
    private readonly userPracticesService: UserPracticesService,
    private readonly userPracticeListenAnswersService: UserPracticeListenAnswersService,
  ) {}

  async create(createPracticeListenDto: CreatePracticeListenDto) {
    const { audio, practiceId } = createPracticeListenDto;
    const { secure_url } = await this.cloudinaryService.uploadAudio(audio);
    const practice = new Practice();
    practice.id = practiceId;
    return this.practiceListenRepository.create({
      audio: secure_url,
      practice,
    });
  }
  findById(id: PracticeListen['id']) {
    return this.practiceListenRepository.findById(id);
  }

  findByIds(ids: PracticeListen['id'][]) {
    return this.practiceListenRepository.findByIds(ids);
  }

  async getPracticeData(id: string, userId: string) {
    const practiceListen =
      await this.practiceListenRepository.findByPracticeId(id);
    if (!practiceListen) throw new NotFoundException('Practice not found');
    const types = await this.practiceListenTypesService.findByPracticeListenId(
      practiceListen.id,
    );
    const userPractice =
      await this.userPracticesService.findByPracticeIdAndUserId(id, userId);
    if (!userPractice) throw new NotFoundException('User practice not found');
    const answers =
      await this.userPracticeListenAnswersService.findByUserPracticeId(
        userPractice.id,
      );
    const typesAnswers = types.map((type) => ({
      ...type,
      questions: type.questions.map((question) => ({
        ...question,
        answer:
          answers.find((answer) => answer.question.id === question.id)
            ?.answer || '',
      })),
    }));
    return { practiceListen, types: typesAnswers };
  }

  async getPracticeDataWithQuestionAndAnswer(id: string) {
    const practiceListen =
      await this.practiceListenRepository.findByPracticeId(id);
    if (!practiceListen) throw new NotFoundException('Practice not found');
    const types = await this.practiceListenTypesService.findByPracticeListenId(
      practiceListen.id,
    );
    return {
      ...practiceListen,
      types,
    };
  }
}
