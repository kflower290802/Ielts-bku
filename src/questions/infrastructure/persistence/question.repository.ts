import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { question } from '../../domain/question';

export abstract class questionRepository {
  abstract create(
    data: Omit<question, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<question>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<question[]>;

  abstract findById(id: question['id']): Promise<NullableType<question>>;

  abstract findByIds(ids: question['id'][]): Promise<question[]>;

  abstract update(
    id: question['id'],
    payload: DeepPartial<question>,
  ): Promise<question | null>;

  abstract remove(id: question['id']): Promise<void>;
}
