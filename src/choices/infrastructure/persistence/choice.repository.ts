import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Choice } from '../../domain/choice';

export abstract class ChoiceRepository {
  abstract create(
    data: Omit<Choice, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Choice>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Choice[]>;

  abstract findById(id: Choice['id']): Promise<NullableType<Choice>>;

  abstract findByIds(ids: Choice['id'][]): Promise<Choice[]>;

  abstract update(
    id: Choice['id'],
    payload: DeepPartial<Choice>,
  ): Promise<Choice | null>;

  abstract remove(id: Choice['id']): Promise<void>;
}
