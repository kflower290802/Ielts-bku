import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { PracticeSpeakingQuestion } from '../../domain/practice-speaking-question';

export abstract class PracticeSpeakingQuestionRepository {
  abstract create(
    data: Omit<PracticeSpeakingQuestion, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<PracticeSpeakingQuestion>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PracticeSpeakingQuestion[]>;

  abstract findById(
    id: PracticeSpeakingQuestion['id'],
  ): Promise<NullableType<PracticeSpeakingQuestion>>;

  abstract findByIds(
    ids: PracticeSpeakingQuestion['id'][],
  ): Promise<PracticeSpeakingQuestion[]>;

  abstract update(
    id: PracticeSpeakingQuestion['id'],
    payload: DeepPartial<PracticeSpeakingQuestion>,
  ): Promise<PracticeSpeakingQuestion | null>;

  abstract remove(id: PracticeSpeakingQuestion['id']): Promise<void>;

  abstract findByPracticeId(id: string): Promise<PracticeSpeakingQuestion[]>;
}
