import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { choiceSchemaClass } from '../entities/choice.schema';
import { choiceRepository } from '../../choice.repository';
import { choice } from '../../../../domain/choice';
import { choiceMapper } from '../mappers/choice.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class choiceDocumentRepository implements choiceRepository {
  constructor(
    @InjectModel(choiceSchemaClass.name)
    private readonly choiceModel: Model<choiceSchemaClass>,
  ) {}

  async create(data: choice): Promise<choice> {
    const persistenceModel = choiceMapper.toPersistence(data);
    const createdEntity = new this.choiceModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return choiceMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<choice[]> {
    const entityObjects = await this.choiceModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      choiceMapper.toDomain(entityObject),
    );
  }

  async findById(id: choice['id']): Promise<NullableType<choice>> {
    const entityObject = await this.choiceModel.findById(id);
    return entityObject ? choiceMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: choice['id'][]): Promise<choice[]> {
    const entityObjects = await this.choiceModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      choiceMapper.toDomain(entityObject),
    );
  }

  async update(
    id: choice['id'],
    payload: Partial<choice>,
  ): Promise<NullableType<choice>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.choiceModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.choiceModel.findOneAndUpdate(
      filter,
      choiceMapper.toPersistence({
        ...choiceMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? choiceMapper.toDomain(entityObject) : null;
  }

  async remove(id: choice['id']): Promise<void> {
    await this.choiceModel.deleteOne({ _id: id });
  }
}
