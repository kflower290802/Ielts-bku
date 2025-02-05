import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { choice } from '../../domain/choice';

export abstract class choiceRepository {
  abstract create(
    data: Omit<choice, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<choice>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<choice[]>;

  abstract findById(id: choice['id']): Promise<NullableType<choice>>;

  abstract findByIds(ids: choice['id'][]): Promise<choice[]>;

  abstract update(
    id: choice['id'],
    payload: DeepPartial<choice>,
  ): Promise<choice | null>;

  abstract remove(id: choice['id']): Promise<void>;
}
