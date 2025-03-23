import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { PracticeListenAnswer } from '../../domain/practice-listen-answer';

export abstract class PracticeListenAnswerRepository {
  abstract create(
    data: Omit<PracticeListenAnswer, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<PracticeListenAnswer>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PracticeListenAnswer[]>;

  abstract findById(
    id: PracticeListenAnswer['id'],
  ): Promise<NullableType<PracticeListenAnswer>>;

  abstract findByIds(
    ids: PracticeListenAnswer['id'][],
  ): Promise<PracticeListenAnswer[]>;

  abstract update(
    id: PracticeListenAnswer['id'],
    payload: DeepPartial<PracticeListenAnswer>,
  ): Promise<PracticeListenAnswer | null>;

  abstract remove(id: PracticeListenAnswer['id']): Promise<void>;

  abstract createMany(
    data: Omit<PracticeListenAnswer, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<PracticeListenAnswer[]>;
}
