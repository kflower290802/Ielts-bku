import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { examSchemaClass } from '../entities/exam.schema';
import { examRepository } from '../../exam.repository';
import { exam } from '../../../../domain/exam';
import { examMapper } from '../mappers/exam.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class examDocumentRepository implements examRepository {
  constructor(
    @InjectModel(examSchemaClass.name)
    private readonly examModel: Model<examSchemaClass>,
  ) {}

  async create(data: exam): Promise<exam> {
    const persistenceModel = examMapper.toPersistence(data);
    const createdEntity = new this.examModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return examMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<exam[]> {
    const entityObjects = await this.examModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      examMapper.toDomain(entityObject),
    );
  }

  async findById(id: exam['id']): Promise<NullableType<exam>> {
    const entityObject = await this.examModel.findById(id);
    return entityObject ? examMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: exam['id'][]): Promise<exam[]> {
    const entityObjects = await this.examModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      examMapper.toDomain(entityObject),
    );
  }

  async update(
    id: exam['id'],
    payload: Partial<exam>,
  ): Promise<NullableType<exam>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.examModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.examModel.findOneAndUpdate(
      filter,
      examMapper.toPersistence({
        ...examMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? examMapper.toDomain(entityObject) : null;
  }

  async remove(id: exam['id']): Promise<void> {
    await this.examModel.deleteOne({ _id: id });
  }
}
