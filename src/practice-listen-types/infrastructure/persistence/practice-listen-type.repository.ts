import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { PracticeListenType } from '../../domain/practice-listen-type';

export abstract class PracticeListenTypeRepository {
  abstract create(
    data: Omit<PracticeListenType, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<PracticeListenType>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PracticeListenType[]>;

  abstract findById(
    id: PracticeListenType['id'],
  ): Promise<NullableType<PracticeListenType>>;

  abstract findByIds(
    ids: PracticeListenType['id'][],
  ): Promise<PracticeListenType[]>;

  abstract update(
    id: PracticeListenType['id'],
    payload: DeepPartial<PracticeListenType>,
  ): Promise<PracticeListenType | null>;

  abstract remove(id: PracticeListenType['id']): Promise<void>;

  abstract findByPracticeListenId(
    id: PracticeListenType['id'],
  ): Promise<PracticeListenType[]>;
}
