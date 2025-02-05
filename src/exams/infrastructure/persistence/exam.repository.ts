import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { exam } from '../../domain/exam';

export abstract class examRepository {
  abstract create(
    data: Omit<exam, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<exam>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<exam[]>;

  abstract findById(id: exam['id']): Promise<NullableType<exam>>;

  abstract findByIds(ids: exam['id'][]): Promise<exam[]>;

  abstract update(
    id: exam['id'],
    payload: DeepPartial<exam>,
  ): Promise<exam | null>;

  abstract remove(id: exam['id']): Promise<void>;
}
