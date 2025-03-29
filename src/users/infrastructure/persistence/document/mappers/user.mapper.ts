import { AccountSchemaClass } from '../../../../../accounts/infrastructure/persistence/document/entities/account.schema';
import { AccountMapper } from '../../../../../accounts/infrastructure/persistence/document/mappers/account.mapper';
import { User } from '../../../../domain/user';
import { UserSchemaClass } from '../entities/user.schema';

export class UserMapper {
  static toDomain(raw: UserSchemaClass): User {
    const domainEntity = new User();
    domainEntity.id = raw._id.toString();
    domainEntity.email = raw.email;
    domainEntity.name = raw.name;
    domainEntity.address = raw.address;
    domainEntity.status = raw.status;
    if (raw.account) {
      domainEntity.account = AccountMapper.toDomain(raw.account);
    }
    domainEntity.target = raw.target;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;
    return domainEntity;
  }

  static toPersistence(domainEntity: User): UserSchemaClass {
    const persistenceSchema = new UserSchemaClass();
    if (domainEntity.id && typeof domainEntity.id === 'string') {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.email = domainEntity.email;
    persistenceSchema.name = domainEntity.name;
    persistenceSchema.status = domainEntity.status;
    persistenceSchema.target = domainEntity.target;
    const accountSchema = new AccountSchemaClass();
    accountSchema._id = domainEntity.account.id;
    persistenceSchema.account = accountSchema;
    persistenceSchema.address = domainEntity.address;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;
    persistenceSchema.deletedAt = domainEntity.deletedAt;
    return persistenceSchema;
  }
}
