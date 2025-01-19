import { Explaination } from '../../../../domain/explaination';
import { ExplainationSchemaClass } from '../entities/explaination.schema';

export class ExplainationMapper {
  public static toDomain(raw: ExplainationSchemaClass): Explaination {
    const domainEntity = new Explaination();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: Explaination,
  ): ExplainationSchemaClass {
    const persistenceSchema = new ExplainationSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
