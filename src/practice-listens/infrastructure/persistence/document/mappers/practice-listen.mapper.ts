import { Practice } from '../../../../../practices/domain/practice';
import { PracticeSchemaClass } from '../../../../../practices/infrastructure/persistence/document/entities/practice.schema';
import { PracticeListen } from '../../../../domain/practice-listen';
import { PracticeListenSchemaClass } from '../entities/practice-listen.schema';

export class PracticeListenMapper {
  public static toDomain(raw: PracticeListenSchemaClass): PracticeListen {
    const domainEntity = new PracticeListen();
    domainEntity.id = raw._id.toString();
    domainEntity.audio = raw.audio;
    const practice = new Practice();
    practice.id = raw.practice._id.toString();
    domainEntity.practice = practice;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: PracticeListen,
  ): PracticeListenSchemaClass {
    const persistenceSchema = new PracticeListenSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.audio = domainEntity.audio;
    const practice = new PracticeSchemaClass();
    practice._id = domainEntity.practice.id;
    persistenceSchema.practice = practice;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
