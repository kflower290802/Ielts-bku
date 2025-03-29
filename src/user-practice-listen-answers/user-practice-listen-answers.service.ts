import { Injectable } from '@nestjs/common';
import { CreateUserPracticeListenAnswerDto } from './dto/create-user-practice-listen-answer.dto';
import { UpdateUserPracticeListenAnswerDto } from './dto/update-user-practice-listen-answer.dto';
import { UserPracticeListenAnswerRepository } from './infrastructure/persistence/user-practice-listen-answer.repository';
import { UserPracticeListenAnswer } from './domain/user-practice-listen-answer';

@Injectable()
export class UserPracticeListenAnswersService {
  constructor(
    private readonly userPracticeListenAnswerRepository: UserPracticeListenAnswerRepository,
  ) {}

  async create(
    createUserPracticeListenAnswerDto: CreateUserPracticeListenAnswerDto,
  ) {
    return this.userPracticeListenAnswerRepository.create(
      createUserPracticeListenAnswerDto,
    );
  }

  async createMany(
    createUserPracticeReadingAnswerDto: CreateUserPracticeListenAnswerDto[],
  ) {
    const userAnswers = createUserPracticeReadingAnswerDto.length
      ? await this.userPracticeListenAnswerRepository.findByUserPractice(
          createUserPracticeReadingAnswerDto[0].userPractice.id,
        )
      : [];
    const notExist = createUserPracticeReadingAnswerDto.filter((userAnswer) => {
      return !userAnswers.some(
        (dto) => dto.question.id === userAnswer.question.id,
      );
    });
    const alreadyExist = createUserPracticeReadingAnswerDto
      .filter((userAnswer) => {
        return userAnswers.some(
          (dto) => dto.question.id === userAnswer.question.id,
        );
      })
      .map((userAnswer) => {
        const id = userAnswers.find(
          (answer) => answer.question.id === userAnswer.question.id,
        )?.id;
        return { ...userAnswer, id };
      });
    await Promise.all(
      alreadyExist.map(async (answer) => {
        await this.userPracticeListenAnswerRepository.update(answer.id || '', {
          answer: answer.answer,
        });
      }),
    );
    return this.userPracticeListenAnswerRepository.createMany(notExist);
  }

  findById(id: UserPracticeListenAnswer['id']) {
    return this.userPracticeListenAnswerRepository.findById(id);
  }

  findByIds(ids: UserPracticeListenAnswer['id'][]) {
    return this.userPracticeListenAnswerRepository.findByIds(ids);
  }

  async update(
    id: UserPracticeListenAnswer['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateUserPracticeListenAnswerDto: UpdateUserPracticeListenAnswerDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.userPracticeListenAnswerRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: UserPracticeListenAnswer['id']) {
    return this.userPracticeListenAnswerRepository.remove(id);
  }

  findByUserPracticeId(id: string) {
    return this.userPracticeListenAnswerRepository.findByUserPractice(id);
  }
}
