import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ExamListenType } from '../../domain/exam-listen-type';

export abstract class ExamListenTypeRepository {
  abstract create(
    data: Omit<ExamListenType, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ExamListenType>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ExamListenType[]>;

  abstract findById(
    id: ExamListenType['id'],
  ): Promise<NullableType<ExamListenType>>;

  abstract findByIds(ids: ExamListenType['id'][]): Promise<ExamListenType[]>;

  abstract update(
    id: ExamListenType['id'],
    payload: DeepPartial<ExamListenType>,
  ): Promise<ExamListenType | null>;

  abstract remove(id: ExamListenType['id']): Promise<void>;

  abstract findBySectionId(id: string): Promise<ExamListenType[]>;
}
