import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserExamAnswerDto } from './dto/update-user-exam-answer.dto';
import { UserExamAnswerRepository } from './infrastructure/persistence/user-exam-answer.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { UserExamAnswer } from './domain/user-exam-answer';
import { User } from '../users/domain/user';
import { UserExamsService } from '../user-exams/user-exams.service';
import { ExamPassageQuestionsService } from '../exam-passage-questions/exam-passage-questions.service';
import { Exam } from '../exams/domain/exam';
import { CreateUserExamAnswerDto } from './dto/create-user-exam-answer.dto';
import { UserExam } from '../user-exams/domain/user-exam';

@Injectable()
export class UserExamAnswersService {
  constructor(
    private readonly userExamAnswerRepository: UserExamAnswerRepository,
    private readonly userExamsService: UserExamsService,
    private readonly examPassageQuestionsService: ExamPassageQuestionsService,
  ) {}

  async create(
    createUserExamAnswersDto: CreateUserExamAnswerDto[],
    userId: User['id'],
  ) {
    if (!createUserExamAnswersDto.length) return [];
    const userExam = await this.userExamsService.findByUserIdAndExamId(
      userId,
      createUserExamAnswersDto[0].examId,
    );
    if (!userExam) throw new BadRequestException('User does not have an exam');
    return Promise.all(
      createUserExamAnswersDto.map(async (createUserExamAnswerDto) => {
        const { examId, examPassageQuestionId, answer } =
          createUserExamAnswerDto;
        const userExam = await this.userExamsService.findByUserIdAndExamId(
          userId,
          examId,
        );
        if (!userExam)
          throw new BadRequestException('User does not have an exam');

        const examPassageQuestion =
          await this.examPassageQuestionsService.findById(
            examPassageQuestionId,
          );

        if (!examPassageQuestion)
          throw new BadRequestException('Question not found');
        const userExamAnswer =
          await this.userExamAnswerRepository.findByUserExamAndExamPassageQuestion(
            userExam.id,
            examPassageQuestionId,
          );
        if (userExamAnswer) {
          return this.userExamAnswerRepository.update(userExamAnswer.id, {
            answer,
          });
        }
        return this.userExamAnswerRepository.create({
          userExam,
          examPassageQuestion,
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
    return this.userExamAnswerRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: UserExamAnswer['id']) {
    return this.userExamAnswerRepository.findById(id);
  }

  findByIds(ids: UserExamAnswer['id'][]) {
    return this.userExamAnswerRepository.findByIds(ids);
  }

  async findByUserIdAndExamId(userId: User['id'], examId: Exam['id']) {
    const userExam = await this.userExamsService.findByUserIdAndExamId(
      userId,
      examId,
    );
    if (!userExam) throw new BadRequestException('User does not have an exam');
    return this.userExamAnswerRepository.findByUserExamId(userExam.id);
  }

  async update(
    id: UserExamAnswer['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateUserExamAnswerDto: UpdateUserExamAnswerDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.userExamAnswerRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: UserExamAnswer['id']) {
    return this.userExamAnswerRepository.remove(id);
  }

  findByUserExamId(userExamId: UserExam['id']) {
    return this.userExamAnswerRepository.findByUserExamId(userExamId);
  }
}
