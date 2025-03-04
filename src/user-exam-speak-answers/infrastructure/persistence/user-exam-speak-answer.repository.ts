import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { UserExamSpeakAnswer } from '../../domain/user-exam-speak-answer';

export abstract class UserExamSpeakAnswerRepository {
  abstract create(
    data: Omit<UserExamSpeakAnswer, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserExamSpeakAnswer>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserExamSpeakAnswer[]>;

  abstract findById(
    id: UserExamSpeakAnswer['id'],
  ): Promise<NullableType<UserExamSpeakAnswer>>;

  abstract findByIds(
    ids: UserExamSpeakAnswer['id'][],
  ): Promise<UserExamSpeakAnswer[]>;

  abstract update(
    id: UserExamSpeakAnswer['id'],
    payload: DeepPartial<UserExamSpeakAnswer>,
  ): Promise<UserExamSpeakAnswer | null>;

  abstract remove(id: UserExamSpeakAnswer['id']): Promise<void>;

  abstract findByQuestionIdAndUserExamId(
    userExamId: string,
    questionId: string,
  ): Promise<NullableType<UserExamSpeakAnswer>>;

  abstract findByUserExamId(userExamId: string): Promise<UserExamSpeakAnswer[]>;
}
