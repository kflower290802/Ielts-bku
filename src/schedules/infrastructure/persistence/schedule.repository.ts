import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { schedule } from '../../domain/schedule';

export abstract class scheduleRepository {
  abstract create(
    data: Omit<schedule, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<schedule>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<schedule[]>;

  abstract findById(id: schedule['id']): Promise<NullableType<schedule>>;

  abstract findByIds(ids: schedule['id'][]): Promise<schedule[]>;

  abstract update(
    id: schedule['id'],
    payload: DeepPartial<schedule>,
  ): Promise<schedule | null>;

  abstract remove(id: schedule['id']): Promise<void>;
}
