import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserExamWritingDto } from './dto/create-user-exam-writing.dto';
import { UserExamWritingRepository } from './infrastructure/persistence/user-exam-writing.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { UserExamWriting } from './domain/user-exam-writing';
import { UserExamsService } from '../user-exams/user-exams.service';
import { ExamWriting } from '../exam-writings/domain/exam-writing';

@Injectable()
export class UserExamWritingsService {
  constructor(
    private readonly userExamWritingRepository: UserExamWritingRepository,
    private readonly userExamsService: UserExamsService,
  ) {}

  async create(
    createUserExamWritingDto: CreateUserExamWritingDto[],
    userId: string,
  ) {
    const examId = createUserExamWritingDto[0].examId;
    const userExam = await this.userExamsService.findByUserIdAndExamId(
      userId,
      examId,
    );
    if (!userExam) throw new NotFoundException('User exam not found');
    return Promise.all(
      createUserExamWritingDto.map(async (dto) => {
        const { answer, examWritingId } = dto;
        const examWriting = new ExamWriting();
        examWriting.id = examWritingId;
        const userExamWriting =
          await this.userExamWritingRepository.findByUserExamIdAndExamWritingId(
            userExam.id,
            examWritingId,
          );
        if (userExamWriting) {
          await this.userExamWritingRepository.update(userExamWriting.id, {
            answer,
          });
        }
        return this.userExamWritingRepository.create({
          userExam,
          answer,
          examWriting,
        });
      }),
    );
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.userExamWritingRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: UserExamWriting['id']) {
    return this.userExamWritingRepository.findById(id);
  }

  findByIds(ids: UserExamWriting['id'][]) {
    return this.userExamWritingRepository.findByIds(ids);
  }

  remove(id: UserExamWriting['id']) {
    return this.userExamWritingRepository.remove(id);
  }

  async findByUserIdAndExamId(userId: string, examId: string) {
    const userExam = await this.userExamsService.findByUserIdAndExamId(
      userId,
      examId,
    );
    if (!userExam) throw new NotFoundException('User exam not found');
    return this.userExamWritingRepository.findByUserExamId(userExam.id);
  }
}
