import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LessonSchemaClass } from '../entities/lesson.schema';
import { LessonRepository } from '../../lesson.repository';
import { Lesson } from '../../../../domain/lesson';
import { LessonMapper } from '../mappers/lesson.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class lessonDocumentRepository implements LessonRepository {
  constructor(
    @InjectModel(LessonSchemaClass.name)
    private readonly lessonModel: Model<LessonSchemaClass>,
  ) {}

  async create(data: Lesson): Promise<Lesson> {
    const persistenceModel = LessonMapper.toPersistence(data);
    const createdEntity = new this.lessonModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return LessonMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Lesson[]> {
    const entityObjects = await this.lessonModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      LessonMapper.toDomain(entityObject),
    );
  }

  async findById(id: Lesson['id']): Promise<NullableType<Lesson>> {
    const entityObject = await this.lessonModel.findById(id);
    return entityObject ? LessonMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Lesson['id'][]): Promise<Lesson[]> {
    const entityObjects = await this.lessonModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      LessonMapper.toDomain(entityObject),
    );
  }

  async update(
    id: Lesson['id'],
    payload: Partial<Lesson>,
  ): Promise<NullableType<Lesson>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.lessonModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.lessonModel.findOneAndUpdate(
      filter,
      LessonMapper.toPersistence({
        ...LessonMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? LessonMapper.toDomain(entityObject) : null;
  }

  async remove(id: Lesson['id']): Promise<void> {
    await this.lessonModel.deleteOne({ _id: id });
  }
}
