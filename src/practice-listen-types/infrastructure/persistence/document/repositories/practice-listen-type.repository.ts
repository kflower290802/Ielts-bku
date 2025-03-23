import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PracticeListenTypeSchemaClass } from '../entities/practice-listen-type.schema';
import { PracticeListenTypeRepository } from '../../practice-listen-type.repository';
import { PracticeListenType } from '../../../../domain/practice-listen-type';
import { PracticeListenTypeMapper } from '../mappers/practice-listen-type.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class PracticeListenTypeDocumentRepository
  implements PracticeListenTypeRepository
{
  constructor(
    @InjectModel(PracticeListenTypeSchemaClass.name)
    private readonly practiceListenTypeModel: Model<PracticeListenTypeSchemaClass>,
  ) {}

  async create(data: PracticeListenType): Promise<PracticeListenType> {
    const persistenceModel = PracticeListenTypeMapper.toPersistence(data);
    const createdEntity = new this.practiceListenTypeModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return PracticeListenTypeMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PracticeListenType[]> {
    const entityObjects = await this.practiceListenTypeModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      PracticeListenTypeMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: PracticeListenType['id'],
  ): Promise<NullableType<PracticeListenType>> {
    const entityObject = await this.practiceListenTypeModel.findById(id);
    return entityObject
      ? PracticeListenTypeMapper.toDomain(entityObject)
      : null;
  }

  async findByIds(
    ids: PracticeListenType['id'][],
  ): Promise<PracticeListenType[]> {
    const entityObjects = await this.practiceListenTypeModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      PracticeListenTypeMapper.toDomain(entityObject),
    );
  }

  async update(
    id: PracticeListenType['id'],
    payload: Partial<PracticeListenType>,
  ): Promise<NullableType<PracticeListenType>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.practiceListenTypeModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.practiceListenTypeModel.findOneAndUpdate(
      filter,
      PracticeListenTypeMapper.toPersistence({
        ...PracticeListenTypeMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject
      ? PracticeListenTypeMapper.toDomain(entityObject)
      : null;
  }

  async remove(id: PracticeListenType['id']): Promise<void> {
    await this.practiceListenTypeModel.deleteOne({ _id: id });
  }

  async findByPracticeListenId(
    id: PracticeListenType['id'],
  ): Promise<PracticeListenType[]> {
    const types = await this.practiceListenTypeModel.find({
      practiceListen: {
        _id: id,
      },
    });
    return types.map(PracticeListenTypeMapper.toDomain);
  }
}
