import { Blog } from '../../../blogs/domain/blog';
import { InfinityPaginationResponseDto } from '../../../utils/dto/infinity-pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { BlogGrammarPoint } from '../../domain/blog-grammar-point';

export abstract class BlogGrammarPointRepository {
  abstract create(
    data: Omit<BlogGrammarPoint, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<BlogGrammarPoint>;

  abstract findAllWithPagination({
    paginationOptions,
    grammarPointId,
  }: {
    paginationOptions: IPaginationOptions;
    grammarPointId?: string;
  }): Promise<InfinityPaginationResponseDto<Blog>>;

  abstract findById(
    id: BlogGrammarPoint['id'],
  ): Promise<NullableType<BlogGrammarPoint>>;

  abstract findByIds(
    ids: BlogGrammarPoint['id'][],
  ): Promise<BlogGrammarPoint[]>;

  abstract update(
    id: BlogGrammarPoint['id'],
    payload: DeepPartial<BlogGrammarPoint>,
  ): Promise<BlogGrammarPoint | null>;

  abstract remove(id: BlogGrammarPoint['id']): Promise<void>;
}
