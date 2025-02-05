import { suggestion } from '../../../../domain/suggestion';
import { suggestionSchemaClass } from '../entities/suggestion.schema';

export class suggestionMapper {
  public static toDomain(raw: suggestionSchemaClass): suggestion {
    const domainEntity = new suggestion();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: suggestion): suggestionSchemaClass {
    const persistenceSchema = new suggestionSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
