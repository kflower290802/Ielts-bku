import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExamListenTypeSchemaClass } from '../entities/exam-listen-type.schema';
import { ExamListenTypeRepository } from '../../exam-listen-type.repository';
import { ExamListenType } from '../../../../domain/exam-listen-type';
import { ExamListenTypeMapper } from '../mappers/exam-listen-type.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ExamListenTypeDocumentRepository
  implements ExamListenTypeRepository
{
  constructor(
    @InjectModel(ExamListenTypeSchemaClass.name)
    private readonly examListenTypeModel: Model<ExamListenTypeSchemaClass>,
  ) {}

  async create(data: ExamListenType): Promise<ExamListenType> {
    const persistenceModel = ExamListenTypeMapper.toPersistence(data);
    const createdEntity = new this.examListenTypeModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return ExamListenTypeMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ExamListenType[]> {
    const entityObjects = await this.examListenTypeModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      ExamListenTypeMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: ExamListenType['id'],
  ): Promise<NullableType<ExamListenType>> {
    const entityObject = await this.examListenTypeModel.findById(id);
    return entityObject ? ExamListenTypeMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: ExamListenType['id'][]): Promise<ExamListenType[]> {
    const entityObjects = await this.examListenTypeModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      ExamListenTypeMapper.toDomain(entityObject),
    );
  }

  async update(
    id: ExamListenType['id'],
    payload: Partial<ExamListenType>,
  ): Promise<NullableType<ExamListenType>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.examListenTypeModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.examListenTypeModel.findOneAndUpdate(
      filter,
      ExamListenTypeMapper.toPersistence({
        ...ExamListenTypeMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? ExamListenTypeMapper.toDomain(entityObject) : null;
  }

  async remove(id: ExamListenType['id']): Promise<void> {
    await this.examListenTypeModel.deleteOne({ _id: id });
  }

  async findBySectionId(id: string): Promise<ExamListenType[]> {
    const entities = await this.examListenTypeModel.find({
      examSection: {
        _id: id,
      },
    });
    return entities.map(ExamListenTypeMapper.toDomain);
  }
}
