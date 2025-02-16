import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ExamRepository } from './infrastructure/persistence/exam.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Exam } from './domain/exam';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ExamStatus, ExamType } from './exams.type';
import { ExamPassagesService } from '../exam-passages/exam-passages.service';
import { UserExamsService } from '../user-exams/user-exams.service';
import { User } from '../users/domain/user';

@Injectable()
export class ExamsService {
  constructor(
    private readonly examRepository: ExamRepository,
    private readonly cloudinaryService: CloudinaryService,
    @Inject(forwardRef(() => ExamPassagesService))
    private readonly examPassagesService: ExamPassagesService,
    @Inject(forwardRef(() => UserExamsService))
    private readonly userExamsService: UserExamsService,
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
    year,
  }: {
    paginationOptions: IPaginationOptions;
    type?: ExamType;
    status?: ExamStatus;
    userId: string;
    year?: number;
  }) {
    return this.examRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      type,
      status,
      userId,
      year,
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

  async findAllPassage(id: Exam['id'], userId: User['id']) {
    const exam = await this.examRepository.findById(id);
    const examPassage = await this.examPassagesService.findAllByExamId(id);
    const userExam = await this.userExamsService.findByUserId(userId);
    return {
      ...exam,
      examPassage,
      userExam,
    };
  }

  findYearsExam() {
    return this.examRepository.findYearsExam();
  }
}
