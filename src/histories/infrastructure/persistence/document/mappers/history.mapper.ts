import { History } from '../../../../domain/history';
import { HistorySchemaClass } from '../entities/history.schema';

export class HistoryMapper {
  public static toDomain(raw: HistorySchemaClass): History {
    const domainEntity = new History();
    domainEntity.id = raw._id.toString();
    domainEntity.startDate = raw.startDate;
    domainEntity.endDate = raw.endDate;
    domainEntity.score = raw.score;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: History): HistorySchemaClass {
    const persistenceSchema = new HistorySchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.score = domainEntity.score;
    persistenceSchema.startDate = domainEntity.startDate;
    persistenceSchema.endDate = domainEntity.endDate;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
