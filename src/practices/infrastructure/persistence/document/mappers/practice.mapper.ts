import { Topic } from '../../../../../topics/domain/topic';
import { TopicSchemaClass } from '../../../../../topics/infrastructure/persistence/document/entities/topic.schema';
import { Practice } from '../../../../domain/practice';
import { PracticeSchemaClass } from '../entities/practice.schema';

export class PracticeMapper {
  public static toDomain(raw: PracticeSchemaClass): Practice {
    const domainEntity = new Practice();
    domainEntity.id = raw._id.toString();
    const topic = new Topic();
    topic.id = raw.topic._id.toString();
    domainEntity.topic = topic;
    domainEntity.name = raw.name;
    domainEntity.image = raw.image;
    domainEntity.type = raw.type;
    domainEntity.isDeleted = raw.isDeleted;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: Practice): PracticeSchemaClass {
    const persistenceSchema = new PracticeSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    const topic = new TopicSchemaClass();
    topic._id = domainEntity.topic.id;
    persistenceSchema.topic = topic;
    persistenceSchema.name = domainEntity.name;
    persistenceSchema.image = domainEntity.image;
    persistenceSchema.type = domainEntity.type;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;
    persistenceSchema.isDeleted = domainEntity.isDeleted;
    return persistenceSchema;
  }
}
