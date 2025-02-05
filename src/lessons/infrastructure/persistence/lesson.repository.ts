import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { lesson } from '../../domain/lesson';

export abstract class lessonRepository {
  abstract create(
    data: Omit<lesson, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<lesson>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<lesson[]>;

  abstract findById(id: lesson['id']): Promise<NullableType<lesson>>;

  abstract findByIds(ids: lesson['id'][]): Promise<lesson[]>;

  abstract update(
    id: lesson['id'],
    payload: DeepPartial<lesson>,
  ): Promise<lesson | null>;

  abstract remove(id: lesson['id']): Promise<void>;
}
