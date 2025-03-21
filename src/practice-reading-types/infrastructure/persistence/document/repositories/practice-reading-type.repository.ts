import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PracticeReadingTypeSchemaClass } from '../entities/practice-reading-type.schema';
import { PracticeReadingTypeRepository } from '../../practice-reading-type.repository';
import { PracticeReadingType } from '../../../../domain/practice-reading-type';
import { PracticeReadingTypeMapper } from '../mappers/practice-reading-type.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class PracticeReadingTypeDocumentRepository
  implements PracticeReadingTypeRepository
{
  constructor(
    @InjectModel(PracticeReadingTypeSchemaClass.name)
    private readonly practiceReadingTypeModel: Model<PracticeReadingTypeSchemaClass>,
  ) {}

  async create(data: PracticeReadingType): Promise<PracticeReadingType> {
    const persistenceModel = PracticeReadingTypeMapper.toPersistence(data);
    const createdEntity = new this.practiceReadingTypeModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return PracticeReadingTypeMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PracticeReadingType[]> {
    const entityObjects = await this.practiceReadingTypeModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      PracticeReadingTypeMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: PracticeReadingType['id'],
  ): Promise<NullableType<PracticeReadingType>> {
    const entityObject = await this.practiceReadingTypeModel.findById(id);
    return entityObject
      ? PracticeReadingTypeMapper.toDomain(entityObject)
      : null;
  }

  async findByIds(
    ids: PracticeReadingType['id'][],
  ): Promise<PracticeReadingType[]> {
    const entityObjects = await this.practiceReadingTypeModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      PracticeReadingTypeMapper.toDomain(entityObject),
    );
  }

  async update(
    id: PracticeReadingType['id'],
    payload: Partial<PracticeReadingType>,
  ): Promise<NullableType<PracticeReadingType>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.practiceReadingTypeModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.practiceReadingTypeModel.findOneAndUpdate(
      filter,
      PracticeReadingTypeMapper.toPersistence({
        ...PracticeReadingTypeMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject
      ? PracticeReadingTypeMapper.toDomain(entityObject)
      : null;
  }

  async remove(id: PracticeReadingType['id']): Promise<void> {
    await this.practiceReadingTypeModel.deleteOne({ _id: id });
  }
}
