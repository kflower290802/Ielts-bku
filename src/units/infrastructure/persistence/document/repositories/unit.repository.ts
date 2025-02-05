import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { unitSchemaClass } from '../entities/unit.schema';
import { unitRepository } from '../../unit.repository';
import { unit } from '../../../../domain/unit';
import { unitMapper } from '../mappers/unit.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class unitDocumentRepository implements unitRepository {
  constructor(
    @InjectModel(unitSchemaClass.name)
    private readonly unitModel: Model<unitSchemaClass>,
  ) {}

  async create(data: unit): Promise<unit> {
    const persistenceModel = unitMapper.toPersistence(data);
    const createdEntity = new this.unitModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return unitMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<unit[]> {
    const entityObjects = await this.unitModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      unitMapper.toDomain(entityObject),
    );
  }

  async findById(id: unit['id']): Promise<NullableType<unit>> {
    const entityObject = await this.unitModel.findById(id);
    return entityObject ? unitMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: unit['id'][]): Promise<unit[]> {
    const entityObjects = await this.unitModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      unitMapper.toDomain(entityObject),
    );
  }

  async update(
    id: unit['id'],
    payload: Partial<unit>,
  ): Promise<NullableType<unit>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.unitModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.unitModel.findOneAndUpdate(
      filter,
      unitMapper.toPersistence({
        ...unitMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? unitMapper.toDomain(entityObject) : null;
  }

  async remove(id: unit['id']): Promise<void> {
    await this.unitModel.deleteOne({ _id: id });
  }
}
