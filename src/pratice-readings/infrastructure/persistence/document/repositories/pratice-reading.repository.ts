import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PraticeReadingSchemaClass } from '../entities/pratice-reading.schema';
import { PraticeReadingRepository } from '../../pratice-reading.repository';
import { PraticeReading } from '../../../../domain/pratice-reading';
import { PraticeReadingMapper } from '../mappers/pratice-reading.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class PraticeReadingDocumentRepository
  implements PraticeReadingRepository
{
  constructor(
    @InjectModel(PraticeReadingSchemaClass.name)
    private readonly praticeReadingModel: Model<PraticeReadingSchemaClass>,
  ) {}

  async create(data: PraticeReading): Promise<PraticeReading> {
    const persistenceModel = PraticeReadingMapper.toPersistence(data);
    const createdEntity = new this.praticeReadingModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return PraticeReadingMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PraticeReading[]> {
    const entityObjects = await this.praticeReadingModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      PraticeReadingMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: PraticeReading['id'],
  ): Promise<NullableType<PraticeReading>> {
    const entityObject = await this.praticeReadingModel.findById(id);
    return entityObject ? PraticeReadingMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: PraticeReading['id'][]): Promise<PraticeReading[]> {
    const entityObjects = await this.praticeReadingModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      PraticeReadingMapper.toDomain(entityObject),
    );
  }

  async update(
    id: PraticeReading['id'],
    payload: Partial<PraticeReading>,
  ): Promise<NullableType<PraticeReading>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.praticeReadingModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.praticeReadingModel.findOneAndUpdate(
      filter,
      PraticeReadingMapper.toPersistence({
        ...PraticeReadingMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? PraticeReadingMapper.toDomain(entityObject) : null;
  }

  async remove(id: PraticeReading['id']): Promise<void> {
    await this.praticeReadingModel.deleteOne({ _id: id });
  }
}
