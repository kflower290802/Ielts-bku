import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserExamListenAnswerDto } from './dto/create-user-exam-listen-answer.dto';
import { UpdateUserExamListenAnswerDto } from './dto/update-user-exam-listen-answer.dto';
import { UserExamListenAnswerRepository } from './infrastructure/persistence/user-exam-listen-answer.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { UserExamListenAnswer } from './domain/user-exam-listen-answer';
import { ExamListenSection } from '../exam-listen-sections/domain/exam-listen-section';
import { UserExamsService } from '../user-exams/user-exams.service';

@Injectable()
export class UserExamListenAnswersService {
  constructor(
    private readonly userExamListenAnswerRepository: UserExamListenAnswerRepository,
    private readonly userExamsService: UserExamsService,
  ) {}

  async create(
    createUserExamListenAnswerDto: CreateUserExamListenAnswerDto[],
    userId: string,
  ) {
    if (!createUserExamListenAnswerDto.length) return [];
    const userExam = await this.userExamsService.findByUserIdAndExamId(
      userId,
      createUserExamListenAnswerDto[0].examId,
    );

    if (!userExam) throw new NotFoundException('User not start this exam');

    return Promise.all(
      createUserExamListenAnswerDto.map(async (dto) => {
        const { examPassageQuestionId, answer } = dto;
        const examPassageQuestion = new ExamListenSection();
        examPassageQuestion.id = examPassageQuestionId;
        const userExamListen =
          await this.userExamListenAnswerRepository.findByUserExamIdAndExamPassageQuestionId(
            userExam.id,
            examPassageQuestionId,
          );
        if (!userExamListen) {
          return this.userExamListenAnswerRepository.create({
            examPassageQuestion,
            answer,
            userExam,
          });
        }
        return this.userExamListenAnswerRepository.update(userExamListen.id, {
          answer,
        });
      }),
    );
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.userExamListenAnswerRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: UserExamListenAnswer['id']) {
    return this.userExamListenAnswerRepository.findById(id);
  }

  findByIds(ids: UserExamListenAnswer['id'][]) {
    return this.userExamListenAnswerRepository.findByIds(ids);
  }

  async update(
    id: UserExamListenAnswer['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateUserExamListenAnswerDto: UpdateUserExamListenAnswerDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.userExamListenAnswerRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: UserExamListenAnswer['id']) {
    return this.userExamListenAnswerRepository.remove(id);
  }

  async findByUserIdAndExamId(userId: string, examId: string) {
    console.log({ userId, examId });
    const userExam = await this.userExamsService.findByUserIdAndExamId(
      userId,
      examId,
    );
    console.log({ userExam });
    if (!userExam) throw new NotFoundException('User exam not found');
    return this.userExamListenAnswerRepository.findByUserExamId(userExam.id);
  }

  findByQuestionId(id: string) {
    return this.userExamListenAnswerRepository.findByQuestionId(id);
  }
}
