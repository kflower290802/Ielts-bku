import { Subscription } from '../../../../domain/subscription';
import { SubscriptionSchemaClass } from '../entities/subscription.schema';

export class SubscriptionMapper {
  public static toDomain(raw: SubscriptionSchemaClass): Subscription {
    const domainEntity = new Subscription();
    domainEntity.id = raw._id.toString();
    domainEntity.startDate = raw.startDate;
    domainEntity.endDate = raw.endDate;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: Subscription,
  ): SubscriptionSchemaClass {
    const persistenceSchema = new SubscriptionSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.startDate = domainEntity.startDate;
    persistenceSchema.endDate = domainEntity.endDate;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
