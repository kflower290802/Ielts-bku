import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogSchemaClass } from '../entities/blog.schema';
import { BlogRepository } from '../../blog.repository';
import { Blog } from '../../../../domain/blog';
import { BlogMapper } from '../mappers/blog.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class BlogDocumentRepository implements BlogRepository {
  constructor(
    @InjectModel(BlogSchemaClass.name)
    private readonly blogModel: Model<BlogSchemaClass>,
  ) {}

  async create(data: Blog): Promise<Blog> {
    const persistenceModel = BlogMapper.toPersistence(data);
    const createdEntity = new this.blogModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return BlogMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Blog[]> {
    const entityObjects = await this.blogModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      BlogMapper.toDomain(entityObject),
    );
  }

  async findById(id: Blog['id']): Promise<NullableType<Blog>> {
    const entityObject = await this.blogModel.findById(id);
    return entityObject ? BlogMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Blog['id'][]): Promise<Blog[]> {
    const entityObjects = await this.blogModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      BlogMapper.toDomain(entityObject),
    );
  }

  async update(
    id: Blog['id'],
    payload: Partial<Blog>,
  ): Promise<NullableType<Blog>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.blogModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.blogModel.findOneAndUpdate(
      filter,
      BlogMapper.toPersistence({
        ...BlogMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? BlogMapper.toDomain(entityObject) : null;
  }

  async remove(id: Blog['id']): Promise<void> {
    await this.blogModel.deleteOne({ _id: id });
  }

  async getTotalBlog(): Promise<number> {
    return this.blogModel.countDocuments();
  }
}
