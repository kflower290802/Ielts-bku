import { Topic } from '../../../../domain/topic';
import { TopicSchemaClass } from '../entities/topic.schema';

export class TopicMapper {
  public static toDomain(raw: TopicSchemaClass): Topic {
    const domainEntity = new Topic();
    domainEntity.id = raw._id.toString();
    domainEntity.name = raw.name;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: Topic): TopicSchemaClass {
    const persistenceSchema = new TopicSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.name = domainEntity.name;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
