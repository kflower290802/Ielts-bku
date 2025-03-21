import { Practice } from '../../../../../practices/domain/practice';
import { PracticeSchemaClass } from '../../../../../practices/infrastructure/persistence/document/entities/practice.schema';
import { PracticeReading } from '../../../../domain/practice-reading';
import { PracticeReadingSchemaClass } from '../entities/practice-reading.schema';

export class PracticeReadingMapper {
  public static toDomain(raw: PracticeReadingSchemaClass): PracticeReading {
    const domainEntity = new PracticeReading();
    domainEntity.id = raw._id.toString();
    domainEntity.content = raw.content;
    domainEntity.image = raw.image;
    const practice = new Practice();
    practice.id = raw.practice._id.toString();
    domainEntity.practice = practice;
    domainEntity.title = raw.title;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: PracticeReading,
  ): PracticeReadingSchemaClass {
    const persistenceSchema = new PracticeReadingSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.content = domainEntity.content;
    persistenceSchema.image = domainEntity.image;
    const practice = new PracticeSchemaClass();
    practice._id = domainEntity.practice.id;
    persistenceSchema.practice = practice;
    persistenceSchema.title = domainEntity.title;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
