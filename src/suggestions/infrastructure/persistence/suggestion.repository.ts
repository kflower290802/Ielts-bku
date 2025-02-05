import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { suggestion } from '../../domain/suggestion';

export abstract class suggestionRepository {
  abstract create(
    data: Omit<suggestion, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<suggestion>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<suggestion[]>;

  abstract findById(id: suggestion['id']): Promise<NullableType<suggestion>>;

  abstract findByIds(ids: suggestion['id'][]): Promise<suggestion[]>;

  abstract update(
    id: suggestion['id'],
    payload: DeepPartial<suggestion>,
  ): Promise<suggestion | null>;

  abstract remove(id: suggestion['id']): Promise<void>;
}
