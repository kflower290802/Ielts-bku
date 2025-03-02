import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { UserExamListenAnswer } from '../../domain/user-exam-listen-answer';

export abstract class UserExamListenAnswerRepository {
  abstract create(
    data: Omit<UserExamListenAnswer, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserExamListenAnswer>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserExamListenAnswer[]>;

  abstract findById(
    id: UserExamListenAnswer['id'],
  ): Promise<NullableType<UserExamListenAnswer>>;

  abstract findByIds(
    ids: UserExamListenAnswer['id'][],
  ): Promise<UserExamListenAnswer[]>;

  abstract update(
    id: UserExamListenAnswer['id'],
    payload: DeepPartial<UserExamListenAnswer>,
  ): Promise<UserExamListenAnswer | null>;

  abstract remove(id: UserExamListenAnswer['id']): Promise<void>;

  abstract findByUserExamId(
    userExamId: string,
  ): Promise<UserExamListenAnswer[]>;

  abstract findByQuestionId(
    questionId: string,
  ): Promise<NullableType<UserExamListenAnswer>>;
}
