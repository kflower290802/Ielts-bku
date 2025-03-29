import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { UserPracticeSpeakAnswer } from '../../domain/user-practice-speak-answer';

export abstract class UserPracticeSpeakAnswerRepository {
  abstract create(
    data: Omit<UserPracticeSpeakAnswer, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserPracticeSpeakAnswer>;

  abstract createMany(
    data: Omit<UserPracticeSpeakAnswer, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<UserPracticeSpeakAnswer[]>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserPracticeSpeakAnswer[]>;

  abstract findById(
    id: UserPracticeSpeakAnswer['id'],
  ): Promise<NullableType<UserPracticeSpeakAnswer>>;

  abstract findByIds(
    ids: UserPracticeSpeakAnswer['id'][],
  ): Promise<UserPracticeSpeakAnswer[]>;

  abstract update(
    id: UserPracticeSpeakAnswer['id'],
    payload: DeepPartial<UserPracticeSpeakAnswer>,
  ): Promise<UserPracticeSpeakAnswer | null>;

  abstract remove(id: UserPracticeSpeakAnswer['id']): Promise<void>;

  abstract findByUserPractice(id: string): Promise<UserPracticeSpeakAnswer[]>;
}
