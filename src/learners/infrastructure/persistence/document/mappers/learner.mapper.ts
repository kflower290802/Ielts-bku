import { learner } from '../../../../domain/learner';
import { learnerSchemaClass } from '../entities/learner.schema';

export class learnerMapper {
  public static toDomain(raw: learnerSchemaClass): learner {
    const domainEntity = new learner();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: learner): learnerSchemaClass {
    const persistenceSchema = new learnerSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
