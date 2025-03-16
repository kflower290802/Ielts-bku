import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ExamReadingType } from '../../domain/exam-reading-type';

export abstract class ExamReadingTypeRepository {
  abstract create(
    data: Omit<ExamReadingType, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ExamReadingType>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ExamReadingType[]>;

  abstract findById(
    id: ExamReadingType['id'],
  ): Promise<NullableType<ExamReadingType>>;

  abstract findByIds(ids: ExamReadingType['id'][]): Promise<ExamReadingType[]>;

  abstract update(
    id: ExamReadingType['id'],
    payload: DeepPartial<ExamReadingType>,
  ): Promise<ExamReadingType | null>;

  abstract remove(id: ExamReadingType['id']): Promise<void>;

  abstract findByPassageId(id: string): Promise<ExamReadingType[]>;
}
