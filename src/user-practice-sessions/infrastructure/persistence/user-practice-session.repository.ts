import { User } from '../../../users/domain/user';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { UserPracticeSession } from '../../domain/user-practice-session';
import { UserPractice } from '../../../user-practices/domain/user-practice';
import { UserPracticeSessionSchemaClass } from './document/entities/user-practice-session.schema';
export abstract class UserPracticeSessionRepository {
  abstract create(
    data: Omit<UserPracticeSession, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserPracticeSession>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserPracticeSession[]>;

  abstract findById(
    id: UserPracticeSession['id'],
  ): Promise<NullableType<UserPracticeSession>>;

  abstract findByIds(
    ids: UserPracticeSession['id'][],
  ): Promise<UserPracticeSession[]>;

  abstract update(
    id: UserPracticeSession['id'],
    payload: DeepPartial<UserPracticeSession>,
  ): Promise<UserPracticeSession | null>;

  abstract remove(id: UserPracticeSession['id']): Promise<void>;

  abstract getTimeSpentByDay(
    userId: User['id'],
    startTime: Date,
    endTime: Date,
  ): Promise<{ date: string; [key: string]: any }[]>;

  abstract findByUserPracticeId(
    userPracticeId: UserPractice['id'],
  ): Promise<NullableType<UserPracticeSession>>;

  abstract findByUserPracticeIds(
    userPracticeIds: UserPractice['id'][],
    startTime: Date,
    endTime: Date,
  ): Promise<UserPracticeSessionSchemaClass[]>;

  abstract findAllByUserPracticeId(
    userPracticeId: UserPractice['id'],
  ): Promise<UserPracticeSession[]>;
}
