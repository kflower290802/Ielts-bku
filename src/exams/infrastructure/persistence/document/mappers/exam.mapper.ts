import { exam } from '../../../../domain/exam';
import { examSchemaClass } from '../entities/exam.schema';

export class examMapper {
  public static toDomain(raw: examSchemaClass): exam {
    const domainEntity = new exam();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: exam): examSchemaClass {
    const persistenceSchema = new examSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
