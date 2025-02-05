import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { question_result } from '../../domain/question-result';

export abstract class question_resultRepository {
  abstract create(
    data: Omit<question_result, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<question_result>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<question_result[]>;

  abstract findById(
    id: question_result['id'],
  ): Promise<NullableType<question_result>>;

  abstract findByIds(ids: question_result['id'][]): Promise<question_result[]>;

  abstract update(
    id: question_result['id'],
    payload: DeepPartial<question_result>,
  ): Promise<question_result | null>;

  abstract remove(id: question_result['id']): Promise<void>;
}
