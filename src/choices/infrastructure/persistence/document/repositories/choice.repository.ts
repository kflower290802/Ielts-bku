import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChoiceSchemaClass } from '../entities/choice.schema';
import { ChoiceRepository } from '../../choice.repository';
import { Choice } from '../../../../domain/choice';
import { ChoiceMapper } from '../mappers/choice.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ChoiceDocumentRepository implements ChoiceRepository {
  constructor(
    @InjectModel(ChoiceSchemaClass.name)
    private readonly choiceModel: Model<ChoiceSchemaClass>,
  ) {}

  async create(data: Choice): Promise<Choice> {
    const persistenceModel = ChoiceMapper.toPersistence(data);
    const createdEntity = new this.choiceModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return ChoiceMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Choice[]> {
    const entityObjects = await this.choiceModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      ChoiceMapper.toDomain(entityObject),
    );
  }

  async findById(id: Choice['id']): Promise<NullableType<Choice>> {
    const entityObject = await this.choiceModel.findById(id);
    return entityObject ? ChoiceMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Choice['id'][]): Promise<Choice[]> {
    const entityObjects = await this.choiceModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      ChoiceMapper.toDomain(entityObject),
    );
  }

  async update(
    id: Choice['id'],
    payload: Partial<Choice>,
  ): Promise<NullableType<Choice>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.choiceModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.choiceModel.findOneAndUpdate(
      filter,
      ChoiceMapper.toPersistence({
        ...ChoiceMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? ChoiceMapper.toDomain(entityObject) : null;
  }

  async remove(id: Choice['id']): Promise<void> {
    await this.choiceModel.deleteOne({ _id: id });
  }
}
