import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { unit } from '../../domain/unit';

export abstract class unitRepository {
  abstract create(
    data: Omit<unit, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<unit>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<unit[]>;

  abstract findById(id: unit['id']): Promise<NullableType<unit>>;

  abstract findByIds(ids: unit['id'][]): Promise<unit[]>;

  abstract update(
    id: unit['id'],
    payload: DeepPartial<unit>,
  ): Promise<unit | null>;

  abstract remove(id: unit['id']): Promise<void>;
}
