import { Injectable } from '@nestjs/common';
import { CreateExamSpeakPartDto } from './dto/create-exam-speak-part.dto';
import { ExamSpeakPart } from './domain/exam-speak-part';
import { ExamSpeak } from '../exam-speaks/domain/exam-speak';
import { ExamSpeakPartRepository } from './infrastructure/persistence/exam-speak-part.repository';

@Injectable()
export class ExamSpeakPartsService {
  constructor(
    private readonly examSpeakPartRepository: ExamSpeakPartRepository,
  ) {}

  async create(createExamSpeakPartDto: CreateExamSpeakPartDto) {
    const examSpeak = new ExamSpeak();
    examSpeak.id = createExamSpeakPartDto.examSpeakId;

    return this.examSpeakPartRepository.create({
      examSpeak,
    });
  }

  findById(id: ExamSpeakPart['id']) {
    return this.examSpeakPartRepository.findById(id);
  }

  findAllByExamId(examId: string) {
    return this.examSpeakPartRepository.findAllByExamId(examId);
  }
}
