import { Injectable } from '@nestjs/common';
import { CreateExamSpeakPartDto } from './dto/create-exam-speak-part.dto';
import { ExamSpeakPart } from './domain/exam-speak-part';
import { ExamSpeakPartRepository } from './infrastructure/persistence/exam-speak-part.repository';
import { Exam } from '../exams/domain/exam';
import { ExamSpeakQuestionsService } from '../exam-speak-questions/exam-speak-questions.service';
import { UserExamSpeakAnswersService } from '../user-exam-speak-answers/user-exam-speak-answers.service';

@Injectable()
export class ExamSpeakPartsService {
  constructor(
    private readonly examSpeakPartRepository: ExamSpeakPartRepository,
    private readonly examSpeakQuestionsService: ExamSpeakQuestionsService,
    private readonly userExamSpeakAnswersService: UserExamSpeakAnswersService,
  ) {}

  async create(createExamSpeakPartDto: CreateExamSpeakPartDto) {
    const exam = new Exam();
    exam.id = createExamSpeakPartDto.examId;

    return this.examSpeakPartRepository.create({
      exam,
    });
  }

  findById(id: ExamSpeakPart['id']) {
    return this.examSpeakPartRepository.findById(id);
  }

  async findAllByExamId(examId: string) {
    const parts = await this.examSpeakPartRepository.findAllByExamId(examId);
    return Promise.all(
      parts.map(async (part) => {
        const questions = await this.examSpeakQuestionsService.findAllByPartId(
          part.id,
        );
        return {
          ...part,
          questions,
        };
      }),
    );
  }

  async findAllByExamIdAndUserId(examId: string, userId: string) {
    const [parts, answers] = await Promise.all([
      this.examSpeakPartRepository.findAllByExamId(examId),
      this.userExamSpeakAnswersService.findByUserIdAndExamId(userId, examId),
    ]);
    return Promise.all(
      parts.map(async (part) => {
        const questions = await this.examSpeakQuestionsService.findAllByPartId(
          part.id,
        );
        return {
          ...part,
          questions: questions.map((question) => {
            return {
              ...question,
              answer:
                answers.find((answer) => answer.question.id === question.id)
                  ?.answer || '',
            };
          }),
        };
      }),
    );
  }

  remove(id: ExamSpeakPart['id']) {
    return this.examSpeakPartRepository.remove(id);
  }
}
