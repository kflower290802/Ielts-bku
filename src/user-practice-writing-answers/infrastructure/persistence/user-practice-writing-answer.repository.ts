import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { UserPracticeWritingAnswer } from '../../domain/user-practice-writing-answer';

export abstract class UserPracticeWritingAnswerRepository {
  abstract create(
    data: Omit<UserPracticeWritingAnswer, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserPracticeWritingAnswer>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserPracticeWritingAnswer[]>;

  abstract findById(
    id: UserPracticeWritingAnswer['id'],
  ): Promise<NullableType<UserPracticeWritingAnswer>>;

  abstract findByIds(
    ids: UserPracticeWritingAnswer['id'][],
  ): Promise<UserPracticeWritingAnswer[]>;

  abstract update(
    id: UserPracticeWritingAnswer['id'],
    payload: DeepPartial<UserPracticeWritingAnswer>,
  ): Promise<UserPracticeWritingAnswer | null>;

  abstract remove(id: UserPracticeWritingAnswer['id']): Promise<void>;

  abstract finByUserPracticeId(
    id: string,
  ): Promise<NullableType<UserPracticeWritingAnswer>>;
}
