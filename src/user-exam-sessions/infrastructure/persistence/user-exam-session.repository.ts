import { UserExam } from '../../../user-exams/domain/user-exam';
import { User } from '../../../users/domain/user';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { UserExamSession } from '../../domain/user-exam-session';
import { UserExamSessionSchemaClass } from './document/entities/user-exam-session.schema';

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

  abstract findLastSessionByUserExamId(
    userExamId: UserExam['id'],
  ): Promise<NullableType<UserExamSession>>;

  abstract getTimeSpentByDay(
    userId: User['id'],
    startTime: Date,
    endTime: Date,
  ): Promise<{ date: string; [key: string]: any }[]>;

  abstract getTimeSpentByUserId(
    userId: User['id'],
    startTime: Date,
    endTime: Date,
  ): Promise<{ date: string; [key: string]: any }[]>;

  abstract findByUserExamIds(
    userExamIds: UserExam['id'][],
    startTime: Date,
    endTime: Date,
  ): Promise<UserExamSessionSchemaClass[]>;
}
