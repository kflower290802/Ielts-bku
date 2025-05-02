import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogGrammarPointSchemaClass } from '../entities/blog-grammar-point.schema';
import { BlogGrammarPointRepository } from '../../blog-grammar-point.repository';
import { BlogGrammarPoint } from '../../../../domain/blog-grammar-point';
import { BlogGrammarPointMapper } from '../mappers/blog-grammar-point.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { BlogMapper } from '../../../../../blogs/infrastructure/persistence/document/mappers/blog.mapper';
import { infinityPagination } from '../../../../../utils/infinity-pagination';
import { InfinityPaginationResponseDto } from '../../../../../utils/dto/infinity-pagination-response.dto';
import { Blog } from '../../../../../blogs/domain/blog';

@Injectable()
export class BlogGrammarPointDocumentRepository
  implements BlogGrammarPointRepository
{
  constructor(
    @InjectModel(BlogGrammarPointSchemaClass.name)
    private readonly blogGrammarPointModel: Model<BlogGrammarPointSchemaClass>,
  ) {}

  async create(data: BlogGrammarPoint): Promise<BlogGrammarPoint> {
    const persistenceModel = BlogGrammarPointMapper.toPersistence(data);
    const createdEntity = new this.blogGrammarPointModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return BlogGrammarPointMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
    grammarPointId,
  }: {
    paginationOptions: IPaginationOptions;
    grammarPointId?: string;
  }): Promise<InfinityPaginationResponseDto<Blog>> {
    const filter = grammarPointId ? { grammarPoint: grammarPointId } : {};
    const entityObjects = await this.blogGrammarPointModel
      .find(filter)
      .populate('blog')
      .select<BlogGrammarPointSchemaClass>('blog')
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);
    const blogs = entityObjects.map((entityObject) =>
      BlogMapper.toDomain(entityObject.blog),
    );
    return infinityPagination(blogs, {
      page: paginationOptions.page,
      limit: paginationOptions.limit,
      total: entityObjects.length,
    });
  }

  async findById(
    id: BlogGrammarPoint['id'],
  ): Promise<NullableType<BlogGrammarPoint>> {
    const entityObject = await this.blogGrammarPointModel.findById(id);
    return entityObject ? BlogGrammarPointMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: BlogGrammarPoint['id'][]): Promise<BlogGrammarPoint[]> {
    const entityObjects = await this.blogGrammarPointModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      BlogGrammarPointMapper.toDomain(entityObject),
    );
  }

  async update(
    id: BlogGrammarPoint['id'],
    payload: Partial<BlogGrammarPoint>,
  ): Promise<NullableType<BlogGrammarPoint>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.blogGrammarPointModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.blogGrammarPointModel.findOneAndUpdate(
      filter,
      BlogGrammarPointMapper.toPersistence({
        ...BlogGrammarPointMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? BlogGrammarPointMapper.toDomain(entityObject) : null;
  }

  async remove(id: BlogGrammarPoint['id']): Promise<void> {
    await this.blogGrammarPointModel.deleteOne({ _id: id });
  }

  async removeByBlogId(blogId: Blog['id']): Promise<void> {
    await this.blogGrammarPointModel.deleteMany({
      blog: {
        _id: blogId,
      },
    });
  }
}
