import { test_result } from '../../../../domain/test-result';
import { test_resultSchemaClass } from '../entities/test-result.schema';

export class test_resultMapper {
  public static toDomain(raw: test_resultSchemaClass): test_result {
    const domainEntity = new test_result();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: test_result,
  ): test_resultSchemaClass {
    const persistenceSchema = new test_resultSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
