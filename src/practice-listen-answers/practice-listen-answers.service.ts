import { Injectable } from '@nestjs/common';
import { CreatePracticeListenAnswerDto } from './dto/create-practice-listen-answer.dto';
import { PracticeListenAnswerRepository } from './infrastructure/persistence/practice-listen-answer.repository';
import { UpdatePracticeListenAnswerDto } from '../practice-listen-questions/dto/update-practice-listen-question.dto';

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

  update(
    id: string,
    updatePracticeListenAnswerDto: UpdatePracticeListenAnswerDto,
  ) {
    return this.practiceListenAnswerRepository.update(
      id,
      updatePracticeListenAnswerDto,
    );
  }

  findByQuestionId(id: string) {
    return this.practiceListenAnswerRepository.findByQuestionId(id);
  }

  findByCorrectQuestionId(id: string) {
    return this.practiceListenAnswerRepository.findByCorrectQuestionId(id);
  }
}
