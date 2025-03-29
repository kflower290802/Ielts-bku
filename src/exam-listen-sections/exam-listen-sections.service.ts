import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExamListenSectionDto } from './dto/create-exam-listen-section.dto';
import { ExamListenSectionRepository } from './infrastructure/persistence/exam-listen-section.repository';
import { ExamListenSection } from './domain/exam-listen-section';
import { ExamsService } from '../exams/exams.service';
import { Exam } from '../exams/domain/exam';
import { ExamListenTypesService } from '../exam-listen-types/exam-listen-types.service';
import { User } from '../users/domain/user';
@Injectable()
export class ExamListenSectionsService {
  constructor(
    private readonly examListenSectionRepository: ExamListenSectionRepository,
    @Inject(forwardRef(() => ExamsService))
    private readonly examsService: ExamsService,
    private readonly examListenTypesService: ExamListenTypesService,
  ) {}

  async create(createExamListenSectionDto: CreateExamListenSectionDto) {
    const { examId } = createExamListenSectionDto;
    const exam = await this.examsService.findById(examId);
    if (!exam) throw new NotFoundException('Exam not found');
    return this.examListenSectionRepository.create({
      exam,
    });
  }

  async findAllByExamId(examId: Exam['id'], userId: User['id']) {
    const sections =
      await this.examListenSectionRepository.findSectionsByExamId(examId);
    const examPassagesQuestions = sections.map(async (passage) => {
      const examPassageTypes =
        await this.examListenTypesService.findByPassageIdWithQuestion(
          passage.id,
          userId,
          examId,
        );
      return { ...passage, types: examPassageTypes };
    });
    return Promise.all(examPassagesQuestions);
  }

  findById(id: ExamListenSection['id']) {
    return this.examListenSectionRepository.findById(id);
  }

  findByIds(ids: ExamListenSection['id'][]) {
    return this.examListenSectionRepository.findByIds(ids);
  }

  remove(id: ExamListenSection['id']) {
    return this.examListenSectionRepository.remove(id);
  }
}
