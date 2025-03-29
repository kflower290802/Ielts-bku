import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserExamSpeakAnswerDto } from './dto/create-user-exam-speak-answer.dto';
import { UpdateUserExamSpeakAnswerDto } from './dto/update-user-exam-speak-answer.dto';
import { UserExamSpeakAnswerRepository } from './infrastructure/persistence/user-exam-speak-answer.repository';
import { UserExamSpeakAnswer } from './domain/user-exam-speak-answer';
import { UserExamsService } from '../user-exams/user-exams.service';
import { ExamSpeakQuestion } from '../exam-speak-questions/domain/exam-speak-question';

@Injectable()
export class UserExamSpeakAnswersService {
  constructor(
    private readonly userExamSpeakAnswerRepository: UserExamSpeakAnswerRepository,
    private readonly userExamsService: UserExamsService,
  ) {}

  async create(
    createUserExamSpeakAnswerDto: CreateUserExamSpeakAnswerDto,
    userId: string,
  ) {
    const { examId, answer, questionId } = createUserExamSpeakAnswerDto;
    const userExam = await this.userExamsService.findByUserIdAndExamId(
      userId,
      examId,
    );
    if (!userExam) throw new NotFoundException('User not start this exam');
    const question = new ExamSpeakQuestion();
    question.id = questionId;
    return this.userExamSpeakAnswerRepository.create({
      question,
      userExam,
      answer,
    });
  }

  async createMany(
    createUserExamSpeakAnswerDto: CreateUserExamSpeakAnswerDto[],
    userId: string,
  ) {
    const userExam = await this.userExamsService.findByUserIdAndExamId(
      userId,
      createUserExamSpeakAnswerDto[0].examId,
    );
    if (!userExam) throw new NotFoundException('User not start this exam');
    const userAnswers =
      await this.userExamSpeakAnswerRepository.findByUserExamId(userExam.id);
    const answers = createUserExamSpeakAnswerDto.map((a) => {
      const question = new ExamSpeakQuestion();
      question.id = a.questionId;
      return {
        ...a,
        userExam,
        question,
      };
    });
    const notExist = answers.filter((a) => {
      return !userAnswers.some(
        (userAnswer) => userAnswer.question.id === a.questionId,
      );
    });
    const alreadyExist = answers.filter((a) => {
      return userAnswers.some(
        (userAnswer) => userAnswer.question.id === a.questionId,
      );
    });
    await Promise.all(
      alreadyExist.map(async (answer) => {
        await this.userExamSpeakAnswerRepository.update(answer.question.id, {
          answer: answer.answer,
        });
      }),
    );
    return this.userExamSpeakAnswerRepository.createMany(notExist);
  }
  findById(id: UserExamSpeakAnswer['id']) {
    return this.userExamSpeakAnswerRepository.findById(id);
  }

  findByIds(ids: UserExamSpeakAnswer['id'][]) {
    return this.userExamSpeakAnswerRepository.findByIds(ids);
  }

  findByQuestionIdAndUserExamId(userExamId: string, questionId: string) {
    return this.userExamSpeakAnswerRepository.findByQuestionIdAndUserExamId(
      questionId,
      userExamId,
    );
  }

  async update(
    id: UserExamSpeakAnswer['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateUserExamSpeakAnswerDto: UpdateUserExamSpeakAnswerDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.userExamSpeakAnswerRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: UserExamSpeakAnswer['id']) {
    return this.userExamSpeakAnswerRepository.remove(id);
  }

  async findByUserIdAndExamId(userId: string, examId: string) {
    const userExam = await this.userExamsService.findByUserIdAndExamId(
      userId,
      examId,
    );
    if (!userExam) throw new NotFoundException('user exam not start');
    return this.userExamSpeakAnswerRepository.findByUserExamId(userExam?.id);
  }
}
