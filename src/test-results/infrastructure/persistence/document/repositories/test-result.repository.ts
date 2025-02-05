import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { test_resultSchemaClass } from '../entities/test-result.schema';
import { test_resultRepository } from '../../test-result.repository';
import { test_result } from '../../../../domain/test-result';
import { test_resultMapper } from '../mappers/test-result.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class test_resultDocumentRepository implements test_resultRepository {
  constructor(
    @InjectModel(test_resultSchemaClass.name)
    private readonly testResultModel: Model<test_resultSchemaClass>,
  ) {}

  async create(data: test_result): Promise<test_result> {
    const persistenceModel = test_resultMapper.toPersistence(data);
    const createdEntity = new this.testResultModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return test_resultMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<test_result[]> {
    const entityObjects = await this.testResultModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      test_resultMapper.toDomain(entityObject),
    );
  }

  async findById(id: test_result['id']): Promise<NullableType<test_result>> {
    const entityObject = await this.testResultModel.findById(id);
    return entityObject ? test_resultMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: test_result['id'][]): Promise<test_result[]> {
    const entityObjects = await this.testResultModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      test_resultMapper.toDomain(entityObject),
    );
  }

  async update(
    id: test_result['id'],
    payload: Partial<test_result>,
  ): Promise<NullableType<test_result>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.testResultModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.testResultModel.findOneAndUpdate(
      filter,
      test_resultMapper.toPersistence({
        ...test_resultMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? test_resultMapper.toDomain(entityObject) : null;
  }

  async remove(id: test_result['id']): Promise<void> {
    await this.testResultModel.deleteOne({ _id: id });
  }
}
