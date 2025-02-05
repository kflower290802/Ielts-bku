import { note } from '../../../../domain/note';
import { noteSchemaClass } from '../entities/note.schema';

export class noteMapper {
  public static toDomain(raw: noteSchemaClass): note {
    const domainEntity = new note();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: note): noteSchemaClass {
    const persistenceSchema = new noteSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
