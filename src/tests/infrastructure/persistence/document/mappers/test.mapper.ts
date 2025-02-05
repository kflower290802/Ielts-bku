import { test } from '../../../../domain/test';
import { testSchemaClass } from '../entities/test.schema';

export class testMapper {
  public static toDomain(raw: testSchemaClass): test {
    const domainEntity = new test();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: test): testSchemaClass {
    const persistenceSchema = new testSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
