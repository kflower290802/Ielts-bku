import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PracticeSchemaClass } from '../entities/practice.schema';
import { PracticeRepository } from '../../practice.repository';
import { Practice } from '../../../../domain/practice';
import { PracticeMapper } from '../mappers/practice.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class PracticeDocumentRepository implements PracticeRepository {
  constructor(
    @InjectModel(PracticeSchemaClass.name)
    private readonly practiceModel: Model<PracticeSchemaClass>,
  ) {}

  async create(data: Practice): Promise<Practice> {
    const persistenceModel = PracticeMapper.toPersistence(data);
    const createdEntity = new this.practiceModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return PracticeMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Practice[]> {
    const entityObjects = await this.practiceModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      PracticeMapper.toDomain(entityObject),
    );
  }

  async findById(id: Practice['id']): Promise<NullableType<Practice>> {
    const entityObject = await this.practiceModel.findById(id);
    return entityObject ? PracticeMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Practice['id'][]): Promise<Practice[]> {
    const entityObjects = await this.practiceModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      PracticeMapper.toDomain(entityObject),
    );
  }

  async update(
    id: Practice['id'],
    payload: Partial<Practice>,
  ): Promise<NullableType<Practice>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.practiceModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.practiceModel.findOneAndUpdate(
      filter,
      PracticeMapper.toPersistence({
        ...PracticeMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? PracticeMapper.toDomain(entityObject) : null;
  }

  async remove(id: Practice['id']): Promise<void> {
    await this.practiceModel.deleteOne({ _id: id });
  }
}
