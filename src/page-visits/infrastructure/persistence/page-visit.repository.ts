import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { PageVisit } from '../../domain/page-visit';

export abstract class PageVisitRepository {
  abstract create(
    data: Omit<PageVisit, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<PageVisit>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PageVisit[]>;

  abstract findById(id: PageVisit['id']): Promise<NullableType<PageVisit>>;

  abstract findByIds(ids: PageVisit['id'][]): Promise<PageVisit[]>;

  abstract update(
    id: PageVisit['id'],
    payload: DeepPartial<PageVisit>,
  ): Promise<PageVisit | null>;

  abstract remove(id: PageVisit['id']): Promise<void>;

  abstract getDailyUserVisits(
    startDate: Date,
    endDate: Date,
  ): Promise<{ date: string; count: number }[]>;
}
