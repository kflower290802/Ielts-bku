import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePracticeSpeakingQuestionDto } from './dto/create-practice-speaking-question.dto';
import { PracticeSpeakingQuestionRepository } from './infrastructure/persistence/practice-speaking-question.repository';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Practice } from '../practices/domain/practice';
import { UserPracticesService } from '../user-practices/user-practices.service';
import { UserPracticeSpeakAnswersService } from '../user-practice-speak-answers/user-practice-speak-answers.service';
@Injectable()
export class PracticeSpeakingQuestionsService {
  constructor(
    private readonly practiceSpeakingQuestionRepository: PracticeSpeakingQuestionRepository,
    private readonly cloudinaryService: CloudinaryService,
    private readonly userPracticesService: UserPracticesService,
    private readonly userPracticeSpeakAnswersService: UserPracticeSpeakAnswersService,
  ) {}

  async create(
    createPracticeSpeakingQuestionDto: CreatePracticeSpeakingQuestionDto,
  ) {
    const { audio, practiceId, ...rest } = createPracticeSpeakingQuestionDto;
    const practice = new Practice();
    practice.id = practiceId;
    const { secure_url } = await this.cloudinaryService.uploadAudio(audio);
    return this.practiceSpeakingQuestionRepository.create({
      audio: secure_url,
      practice,
      ...rest,
    });
  }
  async getPracticeData(id: string, userId: string) {
    const practice =
      await this.practiceSpeakingQuestionRepository.findByPracticeId(id);
    if (!practice) throw new NotFoundException('Practice not found');
    const userPractice =
      await this.userPracticesService.findByPracticeIdAndUserId(id, userId);
    if (!userPractice) throw new NotFoundException('User practice not found');
    const questions =
      await this.practiceSpeakingQuestionRepository.findByPracticeId(id);
    const answers =
      await this.userPracticeSpeakAnswersService.findByUserPracticeId(
        userPractice.id,
      );
    const questionsWithAnswers = questions.map((question) => {
      const answer = answers.find(
        (answer) => answer.question.id === question.id,
      );
      return { ...question, answer: answer?.answer || '' };
    });
    return questionsWithAnswers;
  }

  async getPracticeDataWithQuestionAndAnswer(id: string) {
    const practice =
      await this.practiceSpeakingQuestionRepository.findByPracticeId(id);
    return practice ?? {};
  }
}
