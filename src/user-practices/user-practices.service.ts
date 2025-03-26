import { Injectable } from '@nestjs/common';
import { CreateUserPracticeDto } from './dto/create-user-practice.dto';
import { UpdateUserPracticeDto } from './dto/update-user-practice.dto';
import { UserPracticeRepository } from './infrastructure/persistence/user-practice.repository';
import { UserPractice } from './domain/user-practice';

@Injectable()
export class UserPracticesService {
  constructor(
    private readonly userPracticeRepository: UserPracticeRepository,
  ) {}

  async create(createUserPracticeDto: CreateUserPracticeDto) {
    return this.userPracticeRepository.create(createUserPracticeDto);
  }

  findById(id: UserPractice['id']) {
    return this.userPracticeRepository.findById(id);
  }

  findByIds(ids: UserPractice['id'][]) {
    return this.userPracticeRepository.findByIds(ids);
  }

  async update(
    id: UserPractice['id'],
    updateUserPracticeDto: UpdateUserPracticeDto,
  ) {
    return this.userPracticeRepository.update(id, updateUserPracticeDto);
  }

  remove(id: UserPractice['id']) {
    return this.userPracticeRepository.remove(id);
  }

  findByPracticeIdAndUserId(practiceId: string, userId: string) {
    return this.userPracticeRepository.findByPracticeIdAndUserId(
      practiceId,
      userId,
    );
  }

  findCompletedByPracticeIdAndUserId(practiceId: string, userId: string) {
    return this.userPracticeRepository.findCompletedUserPracticeByPracticeIdAndUserId(
      practiceId,
      userId,
    );
  }

  findUnCompletedUserPracticeByPracticeIdAndUserId(
    practiceId: string,
    userId: string,
  ) {
    return this.userPracticeRepository.findUnCompletedUserPracticeByPracticeIdAndUserId(
      practiceId,
      userId,
    );
  }
}
