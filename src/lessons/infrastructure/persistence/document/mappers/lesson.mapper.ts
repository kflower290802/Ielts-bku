import { lesson } from '../../../../domain/lesson';
import { lessonSchemaClass } from '../entities/lesson.schema';

export class lessonMapper {
  public static toDomain(raw: lessonSchemaClass): lesson {
    const domainEntity = new lesson();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: lesson): lessonSchemaClass {
    const persistenceSchema = new lessonSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
