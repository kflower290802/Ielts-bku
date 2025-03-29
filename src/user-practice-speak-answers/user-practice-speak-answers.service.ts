import { Injectable } from '@nestjs/common';
import { CreateUserPracticeSpeakAnswerDto } from './dto/create-user-practice-speak-answer.dto';
import { UpdateUserPracticeSpeakAnswerDto } from './dto/update-user-practice-speak-answer.dto';
import { UserPracticeSpeakAnswerRepository } from './infrastructure/persistence/user-practice-speak-answer.repository';
import { UserPracticeSpeakAnswer } from './domain/user-practice-speak-answer';

@Injectable()
export class UserPracticeSpeakAnswersService {
  constructor(
    private readonly userPracticeSpeakAnswerRepository: UserPracticeSpeakAnswerRepository,
  ) {}

  async create(
    createUserPracticeSpeakAnswerDto: CreateUserPracticeSpeakAnswerDto,
  ) {
    return this.userPracticeSpeakAnswerRepository.create(
      createUserPracticeSpeakAnswerDto,
    );
  }

  async createMany(
    createUserPracticeSpeakAnswerDto: CreateUserPracticeSpeakAnswerDto[],
  ) {
    const userAnswers = createUserPracticeSpeakAnswerDto.length
      ? await this.userPracticeSpeakAnswerRepository.findByUserPractice(
          createUserPracticeSpeakAnswerDto[0].userPractice.id,
        )
      : [];
    const notExist = createUserPracticeSpeakAnswerDto.filter((userAnswer) => {
      return !userAnswers.some(
        (dto) => dto.question.id === userAnswer.question.id,
      );
    });
    const alreadyExist = createUserPracticeSpeakAnswerDto.filter(
      (userAnswer) => {
        return userAnswers.some(
          (dto) => dto.question.id === userAnswer.question.id,
        );
      },
    );
    await Promise.all(
      alreadyExist.map(async (answer) => {
        await this.userPracticeSpeakAnswerRepository.update(
          answer.question.id,
          {
            answer: answer.answer,
          },
        );
      }),
    );
    return this.userPracticeSpeakAnswerRepository.createMany(notExist);
  }

  findById(id: UserPracticeSpeakAnswer['id']) {
    return this.userPracticeSpeakAnswerRepository.findById(id);
  }

  findByIds(ids: UserPracticeSpeakAnswer['id'][]) {
    return this.userPracticeSpeakAnswerRepository.findByIds(ids);
  }

  async update(
    id: UserPracticeSpeakAnswer['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateUserPracticeSpeakAnswerDto: UpdateUserPracticeSpeakAnswerDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.userPracticeSpeakAnswerRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: UserPracticeSpeakAnswer['id']) {
    return this.userPracticeSpeakAnswerRepository.remove(id);
  }

  findByUserPracticeId(id: string) {
    return this.userPracticeSpeakAnswerRepository.findByUserPractice(id);
  }
}
