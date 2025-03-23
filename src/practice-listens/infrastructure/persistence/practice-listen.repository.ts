import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { PracticeListen } from '../../domain/practice-listen';

export abstract class PracticeListenRepository {
  abstract create(
    data: Omit<PracticeListen, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<PracticeListen>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PracticeListen[]>;

  abstract findById(
    id: PracticeListen['id'],
  ): Promise<NullableType<PracticeListen>>;

  abstract findByIds(ids: PracticeListen['id'][]): Promise<PracticeListen[]>;

  abstract update(
    id: PracticeListen['id'],
    payload: DeepPartial<PracticeListen>,
  ): Promise<PracticeListen | null>;

  abstract remove(id: PracticeListen['id']): Promise<void>;

  abstract findByPracticeId(id: string): Promise<NullableType<PracticeListen>>;
}
