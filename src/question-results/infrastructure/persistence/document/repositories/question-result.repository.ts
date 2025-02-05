import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { question_resultSchemaClass } from '../entities/question-result.schema';
import { question_resultRepository } from '../../question-result.repository';
import { question_result } from '../../../../domain/question-result';
import { question_resultMapper } from '../mappers/question-result.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class question_resultDocumentRepository
  implements question_resultRepository
{
  constructor(
    @InjectModel(question_resultSchemaClass.name)
    private readonly questionResultModel: Model<question_resultSchemaClass>,
  ) {}

  async create(data: question_result): Promise<question_result> {
    const persistenceModel = question_resultMapper.toPersistence(data);
    const createdEntity = new this.questionResultModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return question_resultMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<question_result[]> {
    const entityObjects = await this.questionResultModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      question_resultMapper.toDomain(entityObject),
    );
  }

  async findById(
    id: question_result['id'],
  ): Promise<NullableType<question_result>> {
    const entityObject = await this.questionResultModel.findById(id);
    return entityObject ? question_resultMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: question_result['id'][]): Promise<question_result[]> {
    const entityObjects = await this.questionResultModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      question_resultMapper.toDomain(entityObject),
    );
  }

  async update(
    id: question_result['id'],
    payload: Partial<question_result>,
  ): Promise<NullableType<question_result>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.questionResultModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.questionResultModel.findOneAndUpdate(
      filter,
      question_resultMapper.toPersistence({
        ...question_resultMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? question_resultMapper.toDomain(entityObject) : null;
  }

  async remove(id: question_result['id']): Promise<void> {
    await this.questionResultModel.deleteOne({ _id: id });
  }
}
