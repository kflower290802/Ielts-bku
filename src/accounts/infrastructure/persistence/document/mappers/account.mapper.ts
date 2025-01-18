import { Subscription } from '../../../../../subscriptions/domain/subscription';
import { Account } from '../../../../domain/account';
import { AccountSchemaClass } from '../entities/account.schema';

export class AccountMapper {
  public static toDomain(raw: AccountSchemaClass): Account {
    const domainEntity = new Account();
    domainEntity.id = raw._id.toString();
    domainEntity.username = raw.username;
    domainEntity.role = raw.role;
    domainEntity.password = raw.password;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.subscriptions = raw.subscriptions.map((subscription) => {
      const domainSubscriptions = new Subscription();
      domainSubscriptions.id = subscription._id.toString();
      return domainSubscriptions;
    });
    return domainEntity;
  }

  public static toPersistence(domainEntity: Account): AccountSchemaClass {
    const persistenceSchema = new AccountSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.username = domainEntity.username;
    persistenceSchema.password = domainEntity.password;
    persistenceSchema.role = domainEntity.role;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
