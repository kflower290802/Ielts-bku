import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { UserPracticeReadingAnswer } from '../../domain/user-practice-reading-answer';

export abstract class UserPracticeReadingAnswerRepository {
  abstract create(
    data: Omit<UserPracticeReadingAnswer, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserPracticeReadingAnswer>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserPracticeReadingAnswer[]>;

  abstract findById(
    id: UserPracticeReadingAnswer['id'],
  ): Promise<NullableType<UserPracticeReadingAnswer>>;

  abstract findByIds(
    ids: UserPracticeReadingAnswer['id'][],
  ): Promise<UserPracticeReadingAnswer[]>;

  abstract update(
    id: UserPracticeReadingAnswer['id'],
    payload: DeepPartial<UserPracticeReadingAnswer>,
  ): Promise<UserPracticeReadingAnswer | null>;

  abstract remove(id: UserPracticeReadingAnswer['id']): Promise<void>;

  abstract createMany(
    data: Omit<UserPracticeReadingAnswer, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<UserPracticeReadingAnswer[]>;

  abstract findByUserPractice(id: string): Promise<UserPracticeReadingAnswer[]>;
}
