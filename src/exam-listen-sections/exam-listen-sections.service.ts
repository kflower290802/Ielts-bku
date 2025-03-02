import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExamListenSectionDto } from './dto/create-exam-listen-section.dto';
import { UpdateExamListenSectionDto } from './dto/update-exam-listen-section.dto';
import { ExamListenSectionRepository } from './infrastructure/persistence/exam-listen-section.repository';
import { ExamListenSection } from './domain/exam-listen-section';
import { ExamsService } from '../exams/exams.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Exam } from '../exams/domain/exam';
import { ExamListenQuestionsService } from '../exam-listen-questions/exam-listen-questions.service';

@Injectable()
export class ExamListenSectionsService {
  constructor(
    private readonly examListenSectionRepository: ExamListenSectionRepository,
    @Inject(forwardRef(() => ExamsService))
    private readonly examsService: ExamsService,
    private readonly cloudinaryService: CloudinaryService,
    @Inject(forwardRef(() => ExamListenQuestionsService))
    private readonly examListenQuestionsService: ExamListenQuestionsService,
  ) {}

  async create(createExamListenSectionDto: CreateExamListenSectionDto) {
    const { audio, examId } = createExamListenSectionDto;
    const exam = await this.examsService.findById(examId);
    if (!exam) throw new NotFoundException('Exam not found');
    const { secure_url } = await this.cloudinaryService.uploadAudio(audio);
    return this.examListenSectionRepository.create({ exam, audio: secure_url });
  }

  async findSectionsByExamId(examId: Exam['id']) {
    const sections =
      await this.examListenSectionRepository.findSectionsByExamId(examId);
    return Promise.all(
      sections.map(async (section) => {
        const questions =
          await this.examListenQuestionsService.findByExamSection(section.id);
        return { ...section, questions };
      }),
    );
  }

  findById(id: ExamListenSection['id']) {
    return this.examListenSectionRepository.findById(id);
  }

  findByIds(ids: ExamListenSection['id'][]) {
    return this.examListenSectionRepository.findByIds(ids);
  }

  async update(
    id: ExamListenSection['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateExamListenSectionDto: UpdateExamListenSectionDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.examListenSectionRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: ExamListenSection['id']) {
    return this.examListenSectionRepository.remove(id);
  }
}
