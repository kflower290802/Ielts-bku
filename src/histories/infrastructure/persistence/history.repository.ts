import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { History } from '../../domain/history';

export abstract class HistoryRepository {
  abstract create(
    data: Omit<History, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<History>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<History[]>;

  abstract findById(id: History['id']): Promise<NullableType<History>>;

  abstract findByIds(ids: History['id'][]): Promise<History[]>;

  abstract update(
    id: History['id'],
    payload: DeepPartial<History>,
  ): Promise<History | null>;

  abstract remove(id: History['id']): Promise<void>;
}
