import { AccountSchemaClass } from '../../../../../accounts/infrastructure/persistence/document/entities/account.schema';
import { AccountMapper } from '../../../../../accounts/infrastructure/persistence/document/mappers/account.mapper';
import { Session } from '../../../../domain/session';
import { SessionSchemaClass } from '../entities/session.schema';

export class SessionMapper {
  static toDomain(raw: SessionSchemaClass): Session {
    const domainEntity = new Session();
    domainEntity.id = raw._id.toString();

    if (raw.account) {
      domainEntity.account = AccountMapper.toDomain(raw.account);
    }

    domainEntity.hash = raw.hash;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;
    return domainEntity;
  }
  static toPersistence(domainEntity: Session): SessionSchemaClass {
    const persistenceSchema = new AccountSchemaClass();
    persistenceSchema._id = domainEntity.account.id.toString();
    const sessionEntity = new SessionSchemaClass();
    if (domainEntity.id && typeof domainEntity.id === 'string') {
      sessionEntity._id = domainEntity.id;
    }
    sessionEntity.account = persistenceSchema;
    sessionEntity.hash = domainEntity.hash;
    sessionEntity.createdAt = domainEntity.createdAt;
    sessionEntity.updatedAt = domainEntity.updatedAt;
    sessionEntity.deletedAt = domainEntity.deletedAt;
    return sessionEntity;
  }
}
