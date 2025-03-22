import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { PracticeReadingQuestion } from '../../domain/practice-reading-question';

export abstract class PracticeReadingQuestionRepository {
  abstract create(
    data: Omit<PracticeReadingQuestion, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<PracticeReadingQuestion>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PracticeReadingQuestion[]>;

  abstract findById(
    id: PracticeReadingQuestion['id'],
  ): Promise<NullableType<PracticeReadingQuestion>>;

  abstract findByIds(
    ids: PracticeReadingQuestion['id'][],
  ): Promise<PracticeReadingQuestion[]>;

  abstract update(
    id: PracticeReadingQuestion['id'],
    payload: DeepPartial<PracticeReadingQuestion>,
  ): Promise<PracticeReadingQuestion | null>;

  abstract remove(id: PracticeReadingQuestion['id']): Promise<void>;

  abstract findByTypeId(id: string): Promise<PracticeReadingQuestion[]>;
}
