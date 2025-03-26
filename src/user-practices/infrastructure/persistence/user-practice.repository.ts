import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { UserPractice } from '../../domain/user-practice';

export abstract class UserPracticeRepository {
  abstract create(
    data: Omit<UserPractice, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserPractice>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserPractice[]>;

  abstract findById(
    id: UserPractice['id'],
  ): Promise<NullableType<UserPractice>>;

  abstract findByIds(ids: UserPractice['id'][]): Promise<UserPractice[]>;

  abstract update(
    id: UserPractice['id'],
    payload: DeepPartial<UserPractice>,
  ): Promise<UserPractice | null>;

  abstract remove(id: UserPractice['id']): Promise<void>;

  abstract findByPracticeIdAndUserId(
    practiceId: string,
    userId: string,
  ): Promise<NullableType<UserPractice>>;

  abstract findUnCompletedUserPracticeByPracticeIdAndUserId(
    practice: string,
    userId: string,
  ): Promise<NullableType<UserPractice>>;

  abstract findCompletedUserPracticeByPracticeIdAndUserId(
    practice: string,
    userId: string,
  ): Promise<NullableType<UserPractice>>;
}
