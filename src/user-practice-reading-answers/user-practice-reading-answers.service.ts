import { Injectable } from '@nestjs/common';
import { CreateUserPracticeReadingAnswerDto } from './dto/create-user-practice-reading-answer.dto';
import { UserPracticeReadingAnswerRepository } from './infrastructure/persistence/user-practice-reading-answer.repository';
import { UserPracticeReadingAnswer } from './domain/user-practice-reading-answer';

@Injectable()
export class UserPracticeReadingAnswersService {
  constructor(
    private readonly userPracticeReadingAnswerRepository: UserPracticeReadingAnswerRepository,
  ) {}

  async create(
    createUserPracticeReadingAnswerDto: CreateUserPracticeReadingAnswerDto,
  ) {
    return this.userPracticeReadingAnswerRepository.create(
      createUserPracticeReadingAnswerDto,
    );
  }

  async createMany(
    createUserPracticeReadingAnswerDto: CreateUserPracticeReadingAnswerDto[],
  ) {
    const userAnswers = createUserPracticeReadingAnswerDto.length
      ? await this.userPracticeReadingAnswerRepository.findByUserPractice(
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
        await this.userPracticeReadingAnswerRepository.update(answer.id || '', {
          answer: answer.answer,
        });
      }),
    );
    return this.userPracticeReadingAnswerRepository.createMany(notExist);
  }

  findById(id: UserPracticeReadingAnswer['id']) {
    return this.userPracticeReadingAnswerRepository.findById(id);
  }

  findByIds(ids: UserPracticeReadingAnswer['id'][]) {
    return this.userPracticeReadingAnswerRepository.findByIds(ids);
  }

  remove(id: UserPracticeReadingAnswer['id']) {
    return this.userPracticeReadingAnswerRepository.remove(id);
  }

  findByUserPracticeId(id: string) {
    return this.userPracticeReadingAnswerRepository.findByUserPractice(id);
  }
}
