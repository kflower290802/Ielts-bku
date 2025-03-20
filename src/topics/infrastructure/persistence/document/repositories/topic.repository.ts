import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TopicSchemaClass } from '../entities/topic.schema';
import { TopicRepository } from '../../topic.repository';
import { Topic } from '../../../../domain/topic';
import { TopicMapper } from '../mappers/topic.mapper';

@Injectable()
export class TopicDocumentRepository implements TopicRepository {
  constructor(
    @InjectModel(TopicSchemaClass.name)
    private readonly topicModel: Model<TopicSchemaClass>,
  ) {}

  async create(data: Topic): Promise<Topic> {
    const persistenceModel = TopicMapper.toPersistence(data);
    const createdEntity = new this.topicModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return TopicMapper.toDomain(entityObject);
  }

  async findById(id: Topic['id']): Promise<NullableType<Topic>> {
    const entityObject = await this.topicModel.findById(id);
    return entityObject ? TopicMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: Topic['id'][]): Promise<Topic[]> {
    const entityObjects = await this.topicModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      TopicMapper.toDomain(entityObject),
    );
  }

  async update(
    id: Topic['id'],
    payload: Partial<Topic>,
  ): Promise<NullableType<Topic>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.topicModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.topicModel.findOneAndUpdate(
      filter,
      TopicMapper.toPersistence({
        ...TopicMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? TopicMapper.toDomain(entityObject) : null;
  }

  async remove(id: Topic['id']): Promise<void> {
    await this.topicModel.deleteOne({ _id: id });
  }

  async findAllTopics(): Promise<Topic[]> {
    const entities = await this.topicModel.find().select('_id name');
    return entities.map(TopicMapper.toDomain);
  }
}
