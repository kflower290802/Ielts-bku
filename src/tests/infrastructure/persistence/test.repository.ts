import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { test } from '../../domain/test';

export abstract class testRepository {
  abstract create(
    data: Omit<test, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<test>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<test[]>;

  abstract findById(id: test['id']): Promise<NullableType<test>>;

  abstract findByIds(ids: test['id'][]): Promise<test[]>;

  abstract update(
    id: test['id'],
    payload: DeepPartial<test>,
  ): Promise<test | null>;

  abstract remove(id: test['id']): Promise<void>;
}
