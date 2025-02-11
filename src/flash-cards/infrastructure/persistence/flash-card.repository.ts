import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { FlashCard } from '../../domain/flash-card';

export abstract class FlashCardRepository {
  abstract create(
    data: Omit<FlashCard, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<FlashCard>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<FlashCard[]>;

  abstract findById(id: FlashCard['id']): Promise<NullableType<FlashCard>>;

  abstract findByIds(ids: FlashCard['id'][]): Promise<FlashCard[]>;

  abstract update(
    id: FlashCard['id'],
    payload: DeepPartial<FlashCard>,
  ): Promise<FlashCard | null>;

  abstract remove(id: FlashCard['id']): Promise<void>;
}
