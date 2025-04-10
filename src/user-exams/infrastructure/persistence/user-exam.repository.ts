import { User } from '../../../users/domain/user';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { UserExam } from '../../domain/user-exam';
import { Exam } from '../../../exams/domain/exam';

export abstract class UserExamRepository {
  abstract create(
    data: Omit<UserExam, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserExam>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserExam[]>;

  abstract findById(id: UserExam['id']): Promise<NullableType<UserExam>>;

  abstract findByIds(ids: UserExam['id'][]): Promise<UserExam[]>;

  abstract update(
    id: UserExam['id'],
    payload: DeepPartial<UserExam>,
  ): Promise<UserExam | null>;

  abstract remove(id: UserExam['id']): Promise<void>;

  abstract findByUserId(id: User['id']): Promise<NullableType<UserExam>>;

  abstract findByUserIdAndExamId(
    userId: User['id'],
    examId: UserExam['id'],
  ): Promise<NullableType<UserExam>>;

  abstract getAvgScore(
    userId: User['id'],
    examIds: Exam['id'][],
  ): Promise<number>;

  abstract getScoresByDay(
    userId: User['id'],
    startTime: Date,
    endTime: Date,
  ): Promise<{ date: string; [key: string]: any }[]>;

  abstract findAllByUserId(userId: User['id']): Promise<UserExam[]>;

  abstract findAllByUserIdWithPagination(
    userId: User['id'],
    limit: number,
  ): Promise<UserExam[]>;

  abstract getRecentExams(userId: User['id']): Promise<UserExam[]>;
}
