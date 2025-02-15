import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Exam } from '../../domain/exam';
import { ExamType } from '../../exams.type';

export abstract class ExamRepository {
  abstract create(
    data: Omit<Exam, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Exam>;

  abstract findAllWithPagination({
    paginationOptions,
    type,
  }: {
    paginationOptions: IPaginationOptions;
    type?: ExamType;
  }): Promise<Exam[]>;

  abstract findById(id: Exam['id']): Promise<NullableType<Exam>>;

  abstract findByIds(ids: Exam['id'][]): Promise<Exam[]>;

  abstract update(
    id: Exam['id'],
    payload: DeepPartial<Exam>,
  ): Promise<Exam | null>;

  abstract remove(id: Exam['id']): Promise<void>;
}
