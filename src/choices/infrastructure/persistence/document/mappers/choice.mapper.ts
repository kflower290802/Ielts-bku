import { choice } from '../../../../domain/choice';
import { choiceSchemaClass } from '../entities/choice.schema';

export class choiceMapper {
  public static toDomain(raw: choiceSchemaClass): choice {
    const domainEntity = new choice();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: choice): choiceSchemaClass {
    const persistenceSchema = new choiceSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
