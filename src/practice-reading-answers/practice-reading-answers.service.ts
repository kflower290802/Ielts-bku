import { Injectable } from '@nestjs/common';
import { CreatePracticeReadingAnswerDto } from './dto/create-practice-reading-answer.dto';
import { PracticeReadingAnswerRepository } from './infrastructure/persistence/practice-reading-answer.repository';
import { PracticeReadingAnswer } from './domain/practice-reading-answer';
import { UpdatePracticeReadingAnswerDto } from './dto/update-practice-reading-answer.dto';

@Injectable()
export class PracticeReadingAnswersService {
  constructor(
    private readonly practiceReadingAnswerRepository: PracticeReadingAnswerRepository,
  ) {}

  create(createPracticeReadingAnswerDto: CreatePracticeReadingAnswerDto) {
    return this.practiceReadingAnswerRepository.create(
      createPracticeReadingAnswerDto,
    );
  }
  createMany(createPracticeReadingAnswerDto: CreatePracticeReadingAnswerDto[]) {
    return this.practiceReadingAnswerRepository.createMany(
      createPracticeReadingAnswerDto,
    );
  }

  update(
    id: PracticeReadingAnswer['id'],
    updatePracticeReadingAnswerDto: UpdatePracticeReadingAnswerDto,
  ) {
    return this.practiceReadingAnswerRepository.update(
      id,
      updatePracticeReadingAnswerDto,
    );
  }

  findById(id: PracticeReadingAnswer['id']) {
    return this.practiceReadingAnswerRepository.findById(id);
  }

  findByIds(ids: PracticeReadingAnswer['id'][]) {
    return this.practiceReadingAnswerRepository.findByIds(ids);
  }

  findByQuestionId(id: string) {
    return this.practiceReadingAnswerRepository.findByQuestionId(id);
  }

  findByCorrectQuestionId(id: string) {
    return this.practiceReadingAnswerRepository.findByCorrectQuestionId(id);
  }
}
