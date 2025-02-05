import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { testSchemaClass } from '../entities/test.schema';
import { testRepository } from '../../test.repository';
import { test } from '../../../../domain/test';
import { testMapper } from '../mappers/test.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class testDocumentRepository implements testRepository {
  constructor(
    @InjectModel(testSchemaClass.name)
    private readonly testModel: Model<testSchemaClass>,
  ) {}

  async create(data: test): Promise<test> {
    const persistenceModel = testMapper.toPersistence(data);
    const createdEntity = new this.testModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return testMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<test[]> {
    const entityObjects = await this.testModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      testMapper.toDomain(entityObject),
    );
  }

  async findById(id: test['id']): Promise<NullableType<test>> {
    const entityObject = await this.testModel.findById(id);
    return entityObject ? testMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: test['id'][]): Promise<test[]> {
    const entityObjects = await this.testModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      testMapper.toDomain(entityObject),
    );
  }

  async update(
    id: test['id'],
    payload: Partial<test>,
  ): Promise<NullableType<test>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.testModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.testModel.findOneAndUpdate(
      filter,
      testMapper.toPersistence({
        ...testMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? testMapper.toDomain(entityObject) : null;
  }

  async remove(id: test['id']): Promise<void> {
    await this.testModel.deleteOne({ _id: id });
  }
}
