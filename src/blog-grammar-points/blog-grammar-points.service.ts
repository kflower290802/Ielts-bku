import { Injectable } from '@nestjs/common';
import { CreateBlogGrammarPointDto } from './dto/create-blog-grammar-point.dto';
import { UpdateBlogGrammarPointDto } from './dto/update-blog-grammar-point.dto';
import { BlogGrammarPointRepository } from './infrastructure/persistence/blog-grammar-point.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { BlogGrammarPoint } from './domain/blog-grammar-point';
import { GrammarPoint } from '../grammar-points/domain/grammar-point';
import { Blog } from '../blogs/domain/blog';

@Injectable()
export class BlogGrammarPointsService {
  constructor(
    private readonly blogGrammarPointRepository: BlogGrammarPointRepository,
  ) {}

  async create(createBlogGrammarPointDto: CreateBlogGrammarPointDto) {
    const { grammarPointId, blogId } = createBlogGrammarPointDto;
    const grammarPoint = new GrammarPoint();
    grammarPoint.id = grammarPointId;
    const blog = new Blog();
    blog.id = blogId;
    return this.blogGrammarPointRepository.create({
      grammarPoint,
      blog,
    });
  }
  findAllWithPagination({
    paginationOptions,
    grammarPointId,
  }: {
    paginationOptions: IPaginationOptions;
    grammarPointId?: string;
  }) {
    return this.blogGrammarPointRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      grammarPointId,
    });
  }

  findById(id: BlogGrammarPoint['id']) {
    return this.blogGrammarPointRepository.findById(id);
  }

  findByIds(ids: BlogGrammarPoint['id'][]) {
    return this.blogGrammarPointRepository.findByIds(ids);
  }

  async update(
    id: BlogGrammarPoint['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateBlogGrammarPointDto: UpdateBlogGrammarPointDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.blogGrammarPointRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: BlogGrammarPoint['id']) {
    return this.blogGrammarPointRepository.remove(id);
  }
}
