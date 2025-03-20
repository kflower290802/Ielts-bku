import { PraticeReading } from '../../../../domain/pratice-reading';
import { PraticeReadingSchemaClass } from '../entities/pratice-reading.schema';

export class PraticeReadingMapper {
  public static toDomain(raw: PraticeReadingSchemaClass): PraticeReading {
    const domainEntity = new PraticeReading();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: PraticeReading,
  ): PraticeReadingSchemaClass {
    const persistenceSchema = new PraticeReadingSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
