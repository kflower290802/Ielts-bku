import { UserPracticeSession } from '../../../../domain/user-practice-session';
import { UserPracticeSessionSchemaClass } from '../entities/user-practice-session.schema';

export class UserPracticeSessionMapper {
  public static toDomain(
    raw: UserPracticeSessionSchemaClass,
  ): UserPracticeSession {
    const domainEntity = new UserPracticeSession();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: UserPracticeSession,
  ): UserPracticeSessionSchemaClass {
    const persistenceSchema = new UserPracticeSessionSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
