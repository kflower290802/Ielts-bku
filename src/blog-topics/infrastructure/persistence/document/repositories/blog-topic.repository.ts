import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogTopicSchemaClass } from '../entities/blog-topic.schema';
import { BlogTopicRepository } from '../../blog-topic.repository';
import { BlogTopic } from '../../../../domain/blog-topic';
import { BlogTopicMapper } from '../mappers/blog-topic.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { BlogMapper } from '../../../../../blogs/infrastructure/persistence/document/mappers/blog.mapper';
import { Blog } from '../../../../../blogs/domain/blog';
import { infinityPagination } from '../../../../../utils/infinity-pagination';
import { InfinityPaginationResponseDto } from '../../../../../utils/dto/infinity-pagination-response.dto';
@Injectable()
export class BlogTopicDocumentRepository implements BlogTopicRepository {
  constructor(
    @InjectModel(BlogTopicSchemaClass.name)
    private readonly blogTopicModel: Model<BlogTopicSchemaClass>,
  ) {}

  async create(data: BlogTopic): Promise<BlogTopic> {
    const persistenceModel = BlogTopicMapper.toPersistence(data);
    const createdEntity = new this.blogTopicModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return BlogTopicMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<BlogTopic[]> {
    const entityObjects = await this.blogTopicModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      BlogTopicMapper.toDomain(entityObject),
    );
  }

  async findById(id: BlogTopic['id']): Promise<NullableType<BlogTopic>> {
    const entityObject = await this.blogTopicModel.findById(id);
    return entityObject ? BlogTopicMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: BlogTopic['id'][]): Promise<BlogTopic[]> {
    const entityObjects = await this.blogTopicModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      BlogTopicMapper.toDomain(entityObject),
    );
  }

  async update(
    id: BlogTopic['id'],
    payload: Partial<BlogTopic>,
  ): Promise<NullableType<BlogTopic>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.blogTopicModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.blogTopicModel.findOneAndUpdate(
      filter,
      BlogTopicMapper.toPersistence({
        ...BlogTopicMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? BlogTopicMapper.toDomain(entityObject) : null;
  }

  async remove(id: BlogTopic['id']): Promise<void> {
    await this.blogTopicModel.deleteOne({ _id: id });
  }

  async findAllByTopicIdWithPagination(
    page: number = 1,
    limit: number = 10,
    topicId?: string,
  ): Promise<InfinityPaginationResponseDto<Blog>> {
    const skip = (page - 1) * limit;
    const filter = topicId ? { topic: topicId } : {};
    const [data, total] = await Promise.all([
      this.blogTopicModel
        .find(filter)
        .populate({
          path: 'blog',
        })
        .select<BlogTopicSchemaClass>('blog')
        .skip(skip)
        .limit(limit)
        .lean(),
      this.blogTopicModel.countDocuments(filter),
    ]);
    const blogs = data.map((blogTopic) => BlogMapper.toDomain(blogTopic.blog));
    return infinityPagination(blogs, {
      page,
      limit,
      total,
    });
  }

  async removeByBlogId(blogId: Blog['id']): Promise<void> {
    await this.blogTopicModel.deleteMany({
      blog: {
        _id: blogId,
      },
    });
  }
}
