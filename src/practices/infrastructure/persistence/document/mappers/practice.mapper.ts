import { Practice } from '../../../../domain/practice';
import { PracticeSchemaClass } from '../entities/practice.schema';

export class PracticeMapper {
  public static toDomain(raw: PracticeSchemaClass): Practice {
    const domainEntity = new Practice();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: Practice): PracticeSchemaClass {
    const persistenceSchema = new PracticeSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
