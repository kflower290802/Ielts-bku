import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { UserPracticeListenAnswer } from '../../domain/user-practice-listen-answer';

export abstract class UserPracticeListenAnswerRepository {
  abstract create(
    data: Omit<UserPracticeListenAnswer, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserPracticeListenAnswer>;

  abstract createMany(
    data: Omit<UserPracticeListenAnswer, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<UserPracticeListenAnswer[]>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserPracticeListenAnswer[]>;

  abstract findById(
    id: UserPracticeListenAnswer['id'],
  ): Promise<NullableType<UserPracticeListenAnswer>>;

  abstract findByIds(
    ids: UserPracticeListenAnswer['id'][],
  ): Promise<UserPracticeListenAnswer[]>;

  abstract update(
    id: UserPracticeListenAnswer['id'],
    payload: DeepPartial<UserPracticeListenAnswer>,
  ): Promise<UserPracticeListenAnswer | null>;

  abstract remove(id: UserPracticeListenAnswer['id']): Promise<void>;

  abstract findByUserPractice(id: string): Promise<UserPracticeListenAnswer[]>;
}
