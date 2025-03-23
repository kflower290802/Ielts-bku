import { Practice } from '../../../../../practices/domain/practice';
import { PracticeSchemaClass } from '../../../../../practices/infrastructure/persistence/document/entities/practice.schema';
import { PracticeWriting } from '../../../../domain/practice-writing';
import { PracticeWritingSchemaClass } from '../entities/practice-writing.schema';

export class PracticeWritingMapper {
  public static toDomain(raw: PracticeWritingSchemaClass): PracticeWriting {
    const domainEntity = new PracticeWriting();
    domainEntity.id = raw._id.toString();
    domainEntity.content = raw.content;
    domainEntity.image = raw.image;
    const practice = new Practice();
    practice.id = raw.practice._id.toString();
    domainEntity.practice = practice;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: PracticeWriting,
  ): PracticeWritingSchemaClass {
    const persistenceSchema = new PracticeWritingSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.content = domainEntity.content;
    persistenceSchema.image = domainEntity.image;
    const practice = new PracticeSchemaClass();
    practice._id = domainEntity.practice.id;
    persistenceSchema.practice = practice;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
