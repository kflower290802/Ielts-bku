import { Injectable } from '@nestjs/common';
import { CreateExamWritingDto } from './dto/create-exam-writing.dto';
import { UpdateExamWritingDto } from './dto/update-exam-writing.dto';
import { ExamWritingRepository } from './infrastructure/persistence/exam-writing.repository';
import { ExamWriting } from './domain/exam-writing';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Exam } from '../exams/domain/exam';

@Injectable()
export class ExamWritingsService {
  constructor(
    private readonly examWritingRepository: ExamWritingRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createExamWritingDto: CreateExamWritingDto) {
    const { content, examId, image } = createExamWritingDto;
    const exam = new Exam();
    exam.id = examId;
    const { secure_url } = await this.cloudinaryService.uploadImage(image);
    return this.examWritingRepository.create({
      exam,
      content,
      image: secure_url,
    });
  }

  findById(id: ExamWriting['id']) {
    return this.examWritingRepository.findById(id);
  }

  findByIds(ids: ExamWriting['id'][]) {
    return this.examWritingRepository.findByIds(ids);
  }

  async update(
    id: ExamWriting['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateExamWritingDto: UpdateExamWritingDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.examWritingRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: ExamWriting['id']) {
    return this.examWritingRepository.remove(id);
  }

  findByExamId(id: string) {
    return this.examWritingRepository.findByExamId(id);
  }
}
