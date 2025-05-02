import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { BlogTopic } from '../../domain/blog-topic';
import { InfinityPaginationResponseDto } from '../../../utils/dto/infinity-pagination-response.dto';
import { Blog } from '../../../blogs/domain/blog';

export abstract class BlogTopicRepository {
  abstract create(
    data: Omit<BlogTopic, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<BlogTopic>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<BlogTopic[]>;

  abstract findById(id: BlogTopic['id']): Promise<NullableType<BlogTopic>>;

  abstract findByIds(ids: BlogTopic['id'][]): Promise<BlogTopic[]>;

  abstract update(
    id: BlogTopic['id'],
    payload: DeepPartial<BlogTopic>,
  ): Promise<BlogTopic | null>;

  abstract remove(id: BlogTopic['id']): Promise<void>;

  abstract findAllByTopicIdWithPagination(
    page: number,
    limit: number,
    topicId?: string,
  ): Promise<InfinityPaginationResponseDto<Blog>>;

  abstract removeByBlogId(blogId: Blog['id']): Promise<void>;
}
