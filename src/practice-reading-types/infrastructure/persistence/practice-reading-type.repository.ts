import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { PracticeReadingType } from '../../domain/practice-reading-type';

export abstract class PracticeReadingTypeRepository {
  abstract create(
    data: Omit<PracticeReadingType, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<PracticeReadingType>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PracticeReadingType[]>;

  abstract findById(
    id: PracticeReadingType['id'],
  ): Promise<NullableType<PracticeReadingType>>;

  abstract findByIds(
    ids: PracticeReadingType['id'][],
  ): Promise<PracticeReadingType[]>;

  abstract update(
    id: PracticeReadingType['id'],
    payload: DeepPartial<PracticeReadingType>,
  ): Promise<PracticeReadingType | null>;

  abstract remove(id: PracticeReadingType['id']): Promise<void>;

  abstract findByPracticeReadingId(id: string): Promise<PracticeReadingType[]>;
}
