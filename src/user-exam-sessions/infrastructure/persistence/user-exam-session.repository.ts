import { UserExam } from '../../../user-exams/domain/user-exam';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { UserExamSession } from '../../domain/user-exam-session';

export abstract class UserExamSessionRepository {
  abstract create(
    data: Omit<UserExamSession, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserExamSession>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserExamSession[]>;

  abstract findById(
    id: UserExamSession['id'],
  ): Promise<NullableType<UserExamSession>>;

  abstract findByIds(ids: UserExamSession['id'][]): Promise<UserExamSession[]>;

  abstract update(
    id: UserExamSession['id'],
    payload: DeepPartial<UserExamSession>,
  ): Promise<UserExamSession | null>;

  abstract remove(id: UserExamSession['id']): Promise<void>;

  abstract getSessionsByUserExamId(
    userExamId: UserExam['id'],
  ): Promise<UserExamSession[]>;
}
