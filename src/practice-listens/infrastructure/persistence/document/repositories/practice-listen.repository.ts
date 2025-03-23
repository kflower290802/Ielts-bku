import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PracticeListenSchemaClass } from '../entities/practice-listen.schema';
import { PracticeListenRepository } from '../../practice-listen.repository';
import { PracticeListen } from '../../../../domain/practice-listen';
import { PracticeListenMapper } from '../mappers/practice-listen.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class PracticeListenDocumentRepository
  implements PracticeListenRepository
{
  constructor(
    @InjectModel(PracticeListenSchemaClass.name)
    private readonly practiceListenModel: Model<PracticeListenSchemaClass>,
  ) {}

  async create(data: PracticeListen): Promise<PracticeListen> {
    const persistenceModel = PracticeListenMapper.toPersistence(data);
    const createdEntity = new this.practiceListenModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return PracticeListenMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PracticeListen[]> {
    const entityObjects = await this.practiceListenModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      PracticeListenMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: PracticeListen['id'],
  ): Promise<NullableType<PracticeListen>> {
    const entityObject = await this.practiceListenModel.findById(id);
    return entityObject ? PracticeListenMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: PracticeListen['id'][]): Promise<PracticeListen[]> {
    const entityObjects = await this.practiceListenModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      PracticeListenMapper.toDomain(entityObject),
    );
  }

  async update(
    id: PracticeListen['id'],
    payload: Partial<PracticeListen>,
  ): Promise<NullableType<PracticeListen>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.practiceListenModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.practiceListenModel.findOneAndUpdate(
      filter,
      PracticeListenMapper.toPersistence({
        ...PracticeListenMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? PracticeListenMapper.toDomain(entityObject) : null;
  }

  async remove(id: PracticeListen['id']): Promise<void> {
    await this.practiceListenModel.deleteOne({ _id: id });
  }

  async findByPracticeId(id: string): Promise<NullableType<PracticeListen>> {
    const entity = await this.practiceListenModel.findOne({
      practice: {
        _id: id,
      },
    });
    return entity ? PracticeListenMapper.toDomain(entity) : null;
  }
}
