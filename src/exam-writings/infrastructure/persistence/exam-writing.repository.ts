import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ExamWriting } from '../../domain/exam-writing';

export abstract class ExamWritingRepository {
  abstract create(
    data: Omit<ExamWriting, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ExamWriting>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ExamWriting[]>;

  abstract findById(id: ExamWriting['id']): Promise<NullableType<ExamWriting>>;

  abstract findByIds(ids: ExamWriting['id'][]): Promise<ExamWriting[]>;

  abstract update(
    id: ExamWriting['id'],
    payload: DeepPartial<ExamWriting>,
  ): Promise<ExamWriting | null>;

  abstract remove(id: ExamWriting['id']): Promise<void>;

  abstract findByExamId(id: string): Promise<ExamWriting[]>;
}
