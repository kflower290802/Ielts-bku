import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExplainationSchemaClass } from '../entities/explaination.schema';
import { ExplainationRepository } from '../../explaination.repository';
import { Explaination } from '../../../../domain/explaination';
import { ExplainationMapper } from '../mappers/explaination.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ExplainationDocumentRepository implements ExplainationRepository {
  constructor(
    @InjectModel(ExplainationSchemaClass.name)
    private readonly explainationModel: Model<ExplainationSchemaClass>,
  ) {}

  async create(data: Explaination): Promise<Explaination> {
    const persistenceModel = ExplainationMapper.toPersistence(data);
    const createdEntity = new this.explainationModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return ExplainationMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Explaination[]> {
    const entityObjects = await this.explainationModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      ExplainationMapper.toDomain(entityObject),
    );
  }

  async findById(id: Explaination['id']): Promise<NullableType<Explaination>> {
    const entityObject = await this.explainationModel.findById(id);
    return entityObject ? ExplainationMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Explaination['id'][]): Promise<Explaination[]> {
    const entityObjects = await this.explainationModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      ExplainationMapper.toDomain(entityObject),
    );
  }

  async update(
    id: Explaination['id'],
    payload: Partial<Explaination>,
  ): Promise<NullableType<Explaination>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.explainationModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.explainationModel.findOneAndUpdate(
      filter,
      ExplainationMapper.toPersistence({
        ...ExplainationMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? ExplainationMapper.toDomain(entityObject) : null;
  }

  async remove(id: Explaination['id']): Promise<void> {
    await this.explainationModel.deleteOne({ _id: id });
  }
}
