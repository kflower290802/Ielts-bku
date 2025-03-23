import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { PracticeListenQuestion } from '../../domain/practice-listen-question';

export abstract class PracticeListenQuestionRepository {
  abstract create(
    data: Omit<PracticeListenQuestion, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<PracticeListenQuestion>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PracticeListenQuestion[]>;

  abstract findById(
    id: PracticeListenQuestion['id'],
  ): Promise<NullableType<PracticeListenQuestion>>;

  abstract findByIds(
    ids: PracticeListenQuestion['id'][],
  ): Promise<PracticeListenQuestion[]>;

  abstract update(
    id: PracticeListenQuestion['id'],
    payload: DeepPartial<PracticeListenQuestion>,
  ): Promise<PracticeListenQuestion | null>;

  abstract remove(id: PracticeListenQuestion['id']): Promise<void>;
}
