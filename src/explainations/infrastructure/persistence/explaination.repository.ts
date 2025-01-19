import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Explaination } from '../../domain/explaination';

export abstract class ExplainationRepository {
  abstract create(
    data: Omit<Explaination, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Explaination>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Explaination[]>;

  abstract findById(
    id: Explaination['id'],
  ): Promise<NullableType<Explaination>>;

  abstract findByIds(ids: Explaination['id'][]): Promise<Explaination[]>;

  abstract update(
    id: Explaination['id'],
    payload: DeepPartial<Explaination>,
  ): Promise<Explaination | null>;

  abstract remove(id: Explaination['id']): Promise<void>;
}
