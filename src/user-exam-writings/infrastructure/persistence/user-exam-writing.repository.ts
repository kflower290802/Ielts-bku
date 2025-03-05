import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { UserExamWriting } from '../../domain/user-exam-writing';

export abstract class UserExamWritingRepository {
  abstract create(
    data: Omit<UserExamWriting, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserExamWriting>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserExamWriting[]>;

  abstract findById(
    id: UserExamWriting['id'],
  ): Promise<NullableType<UserExamWriting>>;

  abstract findByIds(ids: UserExamWriting['id'][]): Promise<UserExamWriting[]>;

  abstract update(
    id: UserExamWriting['id'],
    payload: DeepPartial<UserExamWriting>,
  ): Promise<UserExamWriting | null>;

  abstract remove(id: UserExamWriting['id']): Promise<void>;

  abstract findByUserExamId(userExamId: string): Promise<UserExamWriting[]>;

  abstract findByUserExamIdAndExamWritingId(
    userExamId: string,
    examWritingId: string,
  ): Promise<NullableType<UserExamWriting>>;
}
