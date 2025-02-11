import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { BlogLesson } from '../../domain/blog-lesson';

export abstract class BlogLessonRepository {
  abstract create(
    data: Omit<BlogLesson, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<BlogLesson>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<BlogLesson[]>;

  abstract findById(id: BlogLesson['id']): Promise<NullableType<BlogLesson>>;

  abstract findByIds(ids: BlogLesson['id'][]): Promise<BlogLesson[]>;

  abstract update(
    id: BlogLesson['id'],
    payload: DeepPartial<BlogLesson>,
  ): Promise<BlogLesson | null>;

  abstract remove(id: BlogLesson['id']): Promise<void>;
}
