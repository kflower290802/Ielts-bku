import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { GrammarPoint } from '../../domain/grammar-point';

export abstract class GrammarPointRepository {
  abstract create(
    data: Omit<GrammarPoint, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<GrammarPoint>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<GrammarPoint[]>;

  abstract findById(
    id: GrammarPoint['id'],
  ): Promise<NullableType<GrammarPoint>>;

  abstract findByIds(ids: GrammarPoint['id'][]): Promise<GrammarPoint[]>;

  abstract update(
    id: GrammarPoint['id'],
    payload: DeepPartial<GrammarPoint>,
  ): Promise<GrammarPoint | null>;

  abstract remove(id: GrammarPoint['id']): Promise<void>;
}
