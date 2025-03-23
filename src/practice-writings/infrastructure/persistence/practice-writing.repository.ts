import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { PracticeWriting } from '../../domain/practice-writing';

export abstract class PracticeWritingRepository {
  abstract create(
    data: Omit<PracticeWriting, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<PracticeWriting>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PracticeWriting[]>;

  abstract findById(
    id: PracticeWriting['id'],
  ): Promise<NullableType<PracticeWriting>>;

  abstract findByIds(ids: PracticeWriting['id'][]): Promise<PracticeWriting[]>;

  abstract update(
    id: PracticeWriting['id'],
    payload: DeepPartial<PracticeWriting>,
  ): Promise<PracticeWriting | null>;

  abstract remove(id: PracticeWriting['id']): Promise<void>;

  abstract findByPracticeId(id: string): Promise<NullableType<PracticeWriting>>;
}
