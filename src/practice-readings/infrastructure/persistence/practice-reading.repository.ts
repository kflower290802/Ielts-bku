import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { PracticeReading } from '../../domain/practice-reading';

export abstract class PracticeReadingRepository {
  abstract create(
    data: Omit<PracticeReading, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<PracticeReading>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PracticeReading[]>;

  abstract findById(
    id: PracticeReading['id'],
  ): Promise<NullableType<PracticeReading>>;

  abstract findByIds(ids: PracticeReading['id'][]): Promise<PracticeReading[]>;

  abstract update(
    id: PracticeReading['id'],
    payload: DeepPartial<PracticeReading>,
  ): Promise<PracticeReading | null>;

  abstract remove(id: PracticeReading['id']): Promise<void>;
}
