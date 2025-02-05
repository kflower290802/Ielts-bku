import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { suggestionSchemaClass } from '../entities/suggestion.schema';
import { suggestionRepository } from '../../suggestion.repository';
import { suggestion } from '../../../../domain/suggestion';
import { suggestionMapper } from '../mappers/suggestion.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class suggestionDocumentRepository implements suggestionRepository {
  constructor(
    @InjectModel(suggestionSchemaClass.name)
    private readonly suggestionModel: Model<suggestionSchemaClass>,
  ) {}

  async create(data: suggestion): Promise<suggestion> {
    const persistenceModel = suggestionMapper.toPersistence(data);
    const createdEntity = new this.suggestionModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return suggestionMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<suggestion[]> {
    const entityObjects = await this.suggestionModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      suggestionMapper.toDomain(entityObject),
    );
  }

  async findById(id: suggestion['id']): Promise<NullableType<suggestion>> {
    const entityObject = await this.suggestionModel.findById(id);
    return entityObject ? suggestionMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: suggestion['id'][]): Promise<suggestion[]> {
    const entityObjects = await this.suggestionModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      suggestionMapper.toDomain(entityObject),
    );
  }

  async update(
    id: suggestion['id'],
    payload: Partial<suggestion>,
  ): Promise<NullableType<suggestion>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.suggestionModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.suggestionModel.findOneAndUpdate(
      filter,
      suggestionMapper.toPersistence({
        ...suggestionMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? suggestionMapper.toDomain(entityObject) : null;
  }

  async remove(id: suggestion['id']): Promise<void> {
    await this.suggestionModel.deleteOne({ _id: id });
  }
}
