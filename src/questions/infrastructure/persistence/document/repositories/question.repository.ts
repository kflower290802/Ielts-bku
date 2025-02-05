import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { questionSchemaClass } from '../entities/question.schema';
import { questionRepository } from '../../question.repository';
import { question } from '../../../../domain/question';
import { questionMapper } from '../mappers/question.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class questionDocumentRepository implements questionRepository {
  constructor(
    @InjectModel(questionSchemaClass.name)
    private readonly questionModel: Model<questionSchemaClass>,
  ) {}

  async create(data: question): Promise<question> {
    const persistenceModel = questionMapper.toPersistence(data);
    const createdEntity = new this.questionModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return questionMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<question[]> {
    const entityObjects = await this.questionModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      questionMapper.toDomain(entityObject),
    );
  }

  async findById(id: question['id']): Promise<NullableType<question>> {
    const entityObject = await this.questionModel.findById(id);
    return entityObject ? questionMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: question['id'][]): Promise<question[]> {
    const entityObjects = await this.questionModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      questionMapper.toDomain(entityObject),
    );
  }

  async update(
    id: question['id'],
    payload: Partial<question>,
  ): Promise<NullableType<question>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.questionModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.questionModel.findOneAndUpdate(
      filter,
      questionMapper.toPersistence({
        ...questionMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? questionMapper.toDomain(entityObject) : null;
  }

  async remove(id: question['id']): Promise<void> {
    await this.questionModel.deleteOne({ _id: id });
  }
}
