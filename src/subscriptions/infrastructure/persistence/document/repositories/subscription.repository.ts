import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubscriptionSchemaClass } from '../entities/subscription.schema';
import { SubscriptionRepository } from '../../subscription.repository';
import { Subscription } from '../../../../domain/subscription';
import { SubscriptionMapper } from '../mappers/subscription.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class SubscriptionDocumentRepository implements SubscriptionRepository {
  constructor(
    @InjectModel(SubscriptionSchemaClass.name)
    private readonly subscriptionModel: Model<SubscriptionSchemaClass>,
  ) {}

  async create(data: Subscription): Promise<Subscription> {
    const persistenceModel = SubscriptionMapper.toPersistence(data);
    const createdEntity = new this.subscriptionModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return SubscriptionMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Subscription[]> {
    const entityObjects = await this.subscriptionModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      SubscriptionMapper.toDomain(entityObject),
    );
  }

  async findById(id: Subscription['id']): Promise<NullableType<Subscription>> {
    const entityObject = await this.subscriptionModel.findById(id);
    return entityObject ? SubscriptionMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Subscription['id'][]): Promise<Subscription[]> {
    const entityObjects = await this.subscriptionModel.find({
      _id: { $in: ids },
    });
    return entityObjects.map((entityObject) =>
      SubscriptionMapper.toDomain(entityObject),
    );
  }

  async update(
    id: Subscription['id'],
    payload: Partial<Subscription>,
  ): Promise<NullableType<Subscription>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.subscriptionModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.subscriptionModel.findOneAndUpdate(
      filter,
      SubscriptionMapper.toPersistence({
        ...SubscriptionMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? SubscriptionMapper.toDomain(entityObject) : null;
  }

  async remove(id: Subscription['id']): Promise<void> {
    await this.subscriptionModel.deleteOne({ _id: id });
  }

  async findByUserId(userId: string): Promise<NullableType<Subscription>> {
    const now = new Date();
    const entityObject = await this.subscriptionModel
      .findOne({
        user: {
          _id: userId,
        },
        startDate: { $lte: now },
        endDate: { $gte: now },
      })
      .sort({ createdAt: -1 });
    return entityObject ? SubscriptionMapper.toDomain(entityObject) : null;
  }
}
