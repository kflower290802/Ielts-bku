import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { test_result } from '../../domain/test-result';

export abstract class test_resultRepository {
  abstract create(
    data: Omit<test_result, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<test_result>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<test_result[]>;

  abstract findById(id: test_result['id']): Promise<NullableType<test_result>>;

  abstract findByIds(ids: test_result['id'][]): Promise<test_result[]>;

  abstract update(
    id: test_result['id'],
    payload: DeepPartial<test_result>,
  ): Promise<test_result | null>;

  abstract remove(id: test_result['id']): Promise<void>;
}
