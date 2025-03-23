import { Injectable } from '@nestjs/common';
import { CreatePracticeSpeakingQuestionDto } from './dto/create-practice-speaking-question.dto';
import { PracticeSpeakingQuestionRepository } from './infrastructure/persistence/practice-speaking-question.repository';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Practice } from '../practices/domain/practice';

@Injectable()
export class PracticeSpeakingQuestionsService {
  constructor(
    private readonly practiceSpeakingQuestionRepository: PracticeSpeakingQuestionRepository,
    private readonly cloudinaryService: CloudinaryService,
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
  getPracticeData(id: string, userId: string) {
    console.log({ userId });
    return this.practiceSpeakingQuestionRepository.findByPracticeId(id);
  }
}
