import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HistorySchemaClass } from '../entities/history.schema';
import { HistoryRepository } from '../../history.repository';
import { History } from '../../../../domain/history';
import { HistoryMapper } from '../mappers/history.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class HistoryDocumentRepository implements HistoryRepository {
  constructor(
    @InjectModel(HistorySchemaClass.name)
    private readonly historyModel: Model<HistorySchemaClass>,
  ) {}

  async create(data: History): Promise<History> {
    const persistenceModel = HistoryMapper.toPersistence(data);
    const createdEntity = new this.historyModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return HistoryMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<History[]> {
    const entityObjects = await this.historyModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      HistoryMapper.toDomain(entityObject),
    );
  }

  async findById(id: History['id']): Promise<NullableType<History>> {
    const entityObject = await this.historyModel.findById(id);
    return entityObject ? HistoryMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: History['id'][]): Promise<History[]> {
    const entityObjects = await this.historyModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      HistoryMapper.toDomain(entityObject),
    );
  }

  async update(
    id: History['id'],
    payload: Partial<History>,
  ): Promise<NullableType<History>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.historyModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.historyModel.findOneAndUpdate(
      filter,
      HistoryMapper.toPersistence({
        ...HistoryMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? HistoryMapper.toDomain(entityObject) : null;
  }

  async remove(id: History['id']): Promise<void> {
    await this.historyModel.deleteOne({ _id: id });
  }
}
