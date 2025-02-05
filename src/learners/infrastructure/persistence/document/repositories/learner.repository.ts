import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { learnerSchemaClass } from '../entities/learner.schema';
import { learnerRepository } from '../../learner.repository';
import { learner } from '../../../../domain/learner';
import { learnerMapper } from '../mappers/learner.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class learnerDocumentRepository implements learnerRepository {
  constructor(
    @InjectModel(learnerSchemaClass.name)
    private readonly learnerModel: Model<learnerSchemaClass>,
  ) {}

  async create(data: learner): Promise<learner> {
    const persistenceModel = learnerMapper.toPersistence(data);
    const createdEntity = new this.learnerModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return learnerMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<learner[]> {
    const entityObjects = await this.learnerModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      learnerMapper.toDomain(entityObject),
    );
  }

  async findById(id: learner['id']): Promise<NullableType<learner>> {
    const entityObject = await this.learnerModel.findById(id);
    return entityObject ? learnerMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: learner['id'][]): Promise<learner[]> {
    const entityObjects = await this.learnerModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      learnerMapper.toDomain(entityObject),
    );
  }

  async update(
    id: learner['id'],
    payload: Partial<learner>,
  ): Promise<NullableType<learner>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.learnerModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.learnerModel.findOneAndUpdate(
      filter,
      learnerMapper.toPersistence({
        ...learnerMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? learnerMapper.toDomain(entityObject) : null;
  }

  async remove(id: learner['id']): Promise<void> {
    await this.learnerModel.deleteOne({ _id: id });
  }
}
