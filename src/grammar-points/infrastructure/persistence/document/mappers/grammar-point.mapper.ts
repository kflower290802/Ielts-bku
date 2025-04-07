import { GrammarPoint } from '../../../../domain/grammar-point';
import { GrammarPointSchemaClass } from '../entities/grammar-point.schema';

export class GrammarPointMapper {
  public static toDomain(raw: GrammarPointSchemaClass): GrammarPoint {
    const domainEntity = new GrammarPoint();
    domainEntity.id = raw._id.toString();
    domainEntity.name = raw.name;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: GrammarPoint,
  ): GrammarPointSchemaClass {
    const persistenceSchema = new GrammarPointSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.name = domainEntity.name;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
