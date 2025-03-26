import { Injectable } from '@nestjs/common';
import { CreatePracticeListenAnswerDto } from './dto/create-practice-listen-answer.dto';
import { PracticeListenAnswerRepository } from './infrastructure/persistence/practice-listen-answer.repository';

@Injectable()
export class PracticeListenAnswersService {
  constructor(
    private readonly practiceListenAnswerRepository: PracticeListenAnswerRepository,
  ) {}

  async create(createPracticeListenAnswerDto: CreatePracticeListenAnswerDto) {
    return this.practiceListenAnswerRepository.create(
      createPracticeListenAnswerDto,
    );
  }
  createMany(createPracticeReadingAnswerDto: CreatePracticeListenAnswerDto[]) {
    return this.practiceListenAnswerRepository.createMany(
      createPracticeReadingAnswerDto,
    );
  }

  findByQuestionId(id: string) {
    return this.practiceListenAnswerRepository.findByQuestionId(id);
  }

  findByCorrectQuestionId(id: string) {
    return this.practiceListenAnswerRepository.findByCorrectQuestionId(id);
  }
}
