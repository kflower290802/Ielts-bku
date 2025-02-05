import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { learner } from '../../domain/learner';

export abstract class learnerRepository {
  abstract create(
    data: Omit<learner, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<learner>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<learner[]>;

  abstract findById(id: learner['id']): Promise<NullableType<learner>>;

  abstract findByIds(ids: learner['id'][]): Promise<learner[]>;

  abstract update(
    id: learner['id'],
    payload: DeepPartial<learner>,
  ): Promise<learner | null>;

  abstract remove(id: learner['id']): Promise<void>;
}
