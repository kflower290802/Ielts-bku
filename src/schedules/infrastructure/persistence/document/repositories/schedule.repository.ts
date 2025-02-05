import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { scheduleSchemaClass } from '../entities/schedule.schema';
import { scheduleRepository } from '../../schedule.repository';
import { schedule } from '../../../../domain/schedule';
import { scheduleMapper } from '../mappers/schedule.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class scheduleDocumentRepository implements scheduleRepository {
  constructor(
    @InjectModel(scheduleSchemaClass.name)
    private readonly scheduleModel: Model<scheduleSchemaClass>,
  ) {}

  async create(data: schedule): Promise<schedule> {
    const persistenceModel = scheduleMapper.toPersistence(data);
    const createdEntity = new this.scheduleModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return scheduleMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<schedule[]> {
    const entityObjects = await this.scheduleModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      scheduleMapper.toDomain(entityObject),
    );
  }

  async findById(id: schedule['id']): Promise<NullableType<schedule>> {
    const entityObject = await this.scheduleModel.findById(id);
    return entityObject ? scheduleMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: schedule['id'][]): Promise<schedule[]> {
    const entityObjects = await this.scheduleModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      scheduleMapper.toDomain(entityObject),
    );
  }

  async update(
    id: schedule['id'],
    payload: Partial<schedule>,
  ): Promise<NullableType<schedule>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.scheduleModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.scheduleModel.findOneAndUpdate(
      filter,
      scheduleMapper.toPersistence({
        ...scheduleMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? scheduleMapper.toDomain(entityObject) : null;
  }

  async remove(id: schedule['id']): Promise<void> {
    await this.scheduleModel.deleteOne({ _id: id });
  }
}
