import { User } from '../../../../../users/domain/user';
import { Subscription } from '../../../../domain/subscription';
import { SubscriptionSchemaClass } from '../entities/subscription.schema';
import { UserSchemaClass } from '../../../../../users/infrastructure/persistence/document/entities/user.schema';
export class SubscriptionMapper {
  public static toDomain(raw: SubscriptionSchemaClass): Subscription {
    const domainEntity = new Subscription();
    domainEntity.id = raw._id.toString();
    const user = new User();
    user.id = raw.user._id.toString();
    domainEntity.user = user;
    domainEntity.plan = raw.plan;
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
    const user = new UserSchemaClass();
    user._id = domainEntity.user.id;
    persistenceSchema.user = user;
    persistenceSchema.plan = domainEntity.plan;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
