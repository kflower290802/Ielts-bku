import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { PracticeReadingAnswer } from '../../domain/practice-reading-answer';

export abstract class PracticeReadingAnswerRepository {
  abstract create(
    data: Omit<PracticeReadingAnswer, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<PracticeReadingAnswer>;

  abstract createMany(
    data: Omit<PracticeReadingAnswer, 'id' | 'createdAt' | 'updatedAt'>[],
  ): Promise<PracticeReadingAnswer[]>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PracticeReadingAnswer[]>;

  abstract findById(
    id: PracticeReadingAnswer['id'],
  ): Promise<NullableType<PracticeReadingAnswer>>;

  abstract findByIds(
    ids: PracticeReadingAnswer['id'][],
  ): Promise<PracticeReadingAnswer[]>;

  abstract update(
    id: PracticeReadingAnswer['id'],
    payload: DeepPartial<PracticeReadingAnswer>,
  ): Promise<PracticeReadingAnswer | null>;

  abstract remove(id: PracticeReadingAnswer['id']): Promise<void>;

  abstract findByQuestionId(id: string): Promise<PracticeReadingAnswer[]>;
}
