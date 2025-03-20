import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { PraticeReading } from '../../domain/pratice-reading';

export abstract class PraticeReadingRepository {
  abstract create(
    data: Omit<PraticeReading, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<PraticeReading>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PraticeReading[]>;

  abstract findById(
    id: PraticeReading['id'],
  ): Promise<NullableType<PraticeReading>>;

  abstract findByIds(ids: PraticeReading['id'][]): Promise<PraticeReading[]>;

  abstract update(
    id: PraticeReading['id'],
    payload: DeepPartial<PraticeReading>,
  ): Promise<PraticeReading | null>;

  abstract remove(id: PraticeReading['id']): Promise<void>;
}
