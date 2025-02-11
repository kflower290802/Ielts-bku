import { Lesson } from '../../../../domain/lesson';
import { LessonSchemaClass } from '../entities/lesson.schema';

export class LessonMapper {
  public static toDomain(raw: LessonSchemaClass): Lesson {
    const domainEntity = new Lesson();
    domainEntity.id = raw._id.toString();
    domainEntity.videoId = raw.videoId;
    domainEntity.name = raw.name;
    domainEntity.type = raw.type;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: Lesson): LessonSchemaClass {
    const persistenceSchema = new LessonSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.videoId = domainEntity.videoId;
    persistenceSchema.type = domainEntity.type;
    persistenceSchema.name = domainEntity.name;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
