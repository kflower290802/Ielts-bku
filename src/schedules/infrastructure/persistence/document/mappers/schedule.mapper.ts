import { schedule } from '../../../../domain/schedule';
import { scheduleSchemaClass } from '../entities/schedule.schema';

export class scheduleMapper {
  public static toDomain(raw: scheduleSchemaClass): schedule {
    const domainEntity = new schedule();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: schedule): scheduleSchemaClass {
    const persistenceSchema = new scheduleSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
