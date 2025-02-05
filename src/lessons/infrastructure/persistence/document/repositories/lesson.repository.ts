import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lessonSchemaClass } from '../entities/lesson.schema';
import { lessonRepository } from '../../lesson.repository';
import { lesson } from '../../../../domain/lesson';
import { lessonMapper } from '../mappers/lesson.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class lessonDocumentRepository implements lessonRepository {
  constructor(
    @InjectModel(lessonSchemaClass.name)
    private readonly lessonModel: Model<lessonSchemaClass>,
  ) {}

  async create(data: lesson): Promise<lesson> {
    const persistenceModel = lessonMapper.toPersistence(data);
    const createdEntity = new this.lessonModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return lessonMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<lesson[]> {
    const entityObjects = await this.lessonModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      lessonMapper.toDomain(entityObject),
    );
  }

  async findById(id: lesson['id']): Promise<NullableType<lesson>> {
    const entityObject = await this.lessonModel.findById(id);
    return entityObject ? lessonMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: lesson['id'][]): Promise<lesson[]> {
    const entityObjects = await this.lessonModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      lessonMapper.toDomain(entityObject),
    );
  }

  async update(
    id: lesson['id'],
    payload: Partial<lesson>,
  ): Promise<NullableType<lesson>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.lessonModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.lessonModel.findOneAndUpdate(
      filter,
      lessonMapper.toPersistence({
        ...lessonMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? lessonMapper.toDomain(entityObject) : null;
  }

  async remove(id: lesson['id']): Promise<void> {
    await this.lessonModel.deleteOne({ _id: id });
  }
}
