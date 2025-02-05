import { unit } from '../../../../domain/unit';
import { unitSchemaClass } from '../entities/unit.schema';

export class unitMapper {
  public static toDomain(raw: unitSchemaClass): unit {
    const domainEntity = new unit();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: unit): unitSchemaClass {
    const persistenceSchema = new unitSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
