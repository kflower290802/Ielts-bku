import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PracticeReadingSchemaClass } from '../entities/practice-reading.schema';
import { PracticeReadingRepository } from '../../practice-reading.repository';
import { PracticeReading } from '../../../../domain/practice-reading';
import { PracticeReadingMapper } from '../mappers/practice-reading.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class PracticeReadingDocumentRepository
  implements PracticeReadingRepository
{
  constructor(
    @InjectModel(PracticeReadingSchemaClass.name)
    private readonly practiceReadingModel: Model<PracticeReadingSchemaClass>,
  ) {}

  async create(data: PracticeReading): Promise<PracticeReading> {
    const persistenceModel = PracticeReadingMapper.toPersistence(data);
    const createdEntity = new this.practiceReadingModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return PracticeReadingMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PracticeReading[]> {
    const entityObjects = await this.practiceReadingModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      PracticeReadingMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: PracticeReading['id'],
  ): Promise<NullableType<PracticeReading>> {
    const entityObject = await this.practiceReadingModel.findById(id);
    return entityObject ? PracticeReadingMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: PracticeReading['id'][]): Promise<PracticeReading[]> {
    const entityObjects = await this.practiceReadingModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      PracticeReadingMapper.toDomain(entityObject),
    );
  }

  async update(
    id: PracticeReading['id'],
    payload: Partial<PracticeReading>,
  ): Promise<NullableType<PracticeReading>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.practiceReadingModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.practiceReadingModel.findOneAndUpdate(
      filter,
      PracticeReadingMapper.toPersistence({
        ...PracticeReadingMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? PracticeReadingMapper.toDomain(entityObject) : null;
  }

  async remove(id: PracticeReading['id']): Promise<void> {
    await this.practiceReadingModel.deleteOne({ _id: id });
  }
}
