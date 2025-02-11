import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogLessonSchemaClass } from '../entities/blog-lesson.schema';
import { BlogLessonRepository } from '../../blog-lesson.repository';
import { BlogLesson } from '../../../../domain/blog-lesson';
import { BlogLessonMapper } from '../mappers/blog-lesson.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class BlogLessonDocumentRepository implements BlogLessonRepository {
  constructor(
    @InjectModel(BlogLessonSchemaClass.name)
    private readonly blogLessonModel: Model<BlogLessonSchemaClass>,
  ) {}

  async create(data: BlogLesson): Promise<BlogLesson> {
    const persistenceModel = BlogLessonMapper.toPersistence(data);
    const createdEntity = new this.blogLessonModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return BlogLessonMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<BlogLesson[]> {
    const entityObjects = await this.blogLessonModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      BlogLessonMapper.toDomain(entityObject),
    );
  }

  async findById(id: BlogLesson['id']): Promise<NullableType<BlogLesson>> {
    const entityObject = await this.blogLessonModel
      .findById(id)
      .populate('blog');
    return entityObject ? BlogLessonMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: BlogLesson['id'][]): Promise<BlogLesson[]> {
    const entityObjects = await this.blogLessonModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      BlogLessonMapper.toDomain(entityObject),
    );
  }

  async update(
    id: BlogLesson['id'],
    payload: Partial<BlogLesson>,
  ): Promise<NullableType<BlogLesson>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.blogLessonModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.blogLessonModel.findOneAndUpdate(
      filter,
      BlogLessonMapper.toPersistence({
        ...BlogLessonMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? BlogLessonMapper.toDomain(entityObject) : null;
  }

  async remove(id: BlogLesson['id']): Promise<void> {
    await this.blogLessonModel.deleteOne({ _id: id });
  }
}
