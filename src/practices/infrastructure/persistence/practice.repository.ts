import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { Practice } from '../../domain/practice';
import { PracticeType } from '../../pratices.type';

export abstract class PracticeRepository {
  abstract create(
    data: Omit<Practice, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Practice>;

  abstract findAllWithPagination(filterOptions: {
    topic?: string;
    type?: PracticeType;
  }): Promise<Practice[]>;

  abstract findById(id: Practice['id']): Promise<NullableType<Practice>>;

  abstract findByIds(ids: Practice['id'][]): Promise<Practice[]>;

  abstract update(
    id: Practice['id'],
    payload: DeepPartial<Practice>,
  ): Promise<Practice | null>;

  abstract remove(id: Practice['id']): Promise<void>;

  abstract getTotalPractice(): Promise<number>;
}
