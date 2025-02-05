import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { note } from '../../domain/note';

export abstract class noteRepository {
  abstract create(
    data: Omit<note, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<note>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<note[]>;

  abstract findById(id: note['id']): Promise<NullableType<note>>;

  abstract findByIds(ids: note['id'][]): Promise<note[]>;

  abstract update(
    id: note['id'],
    payload: DeepPartial<note>,
  ): Promise<note | null>;

  abstract remove(id: note['id']): Promise<void>;
}
