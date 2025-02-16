import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ExamRepository } from './infrastructure/persistence/exam.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Exam } from './domain/exam';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ExamStatus, ExamType } from './exams.type';
import { ExamPassagesService } from '../exam-passages/exam-passages.service';

@Injectable()
export class ExamsService {
  constructor(
    private readonly examRepository: ExamRepository,
    private readonly cloudinaryService: CloudinaryService,
    @Inject(forwardRef(() => ExamPassagesService))
    private readonly examPassagesService: ExamPassagesService,
  ) {}

  async create(createExamDto: CreateExamDto) {
    const { secure_url } = await this.cloudinaryService.uploadImage(
      createExamDto.file,
    );
    return this.examRepository.create({
      ...createExamDto,
      image: secure_url,
    });
  }

  findAllWithPagination({
    paginationOptions,
    type,
    status,
    userId,
  }: {
    paginationOptions: IPaginationOptions;
    type?: ExamType;
    status?: ExamStatus;
    userId: string;
  }) {
    return this.examRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      type,
      status,
      userId,
    });
  }

  findById(id: Exam['id']) {
    return this.examRepository.findById(id);
  }

  findByIds(ids: Exam['id'][]) {
    return this.examRepository.findByIds(ids);
  }

  async update(
    id: Exam['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateExamDto: UpdateExamDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.examRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Exam['id']) {
    return this.examRepository.remove(id);
  }

  async findAllPassage(id: Exam['id']) {
    const exam = await this.examRepository.findById(id);
    const examPassage = await this.examPassagesService.findAllByExamId(id);
    return {
      ...exam,
      examPassage,
    };
  }
}
