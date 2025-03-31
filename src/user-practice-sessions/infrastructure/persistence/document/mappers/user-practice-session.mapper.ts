import { UserPractice } from '../../../../../user-practices/domain/user-practice';
import { UserPracticeSchemaClass } from '../../../../../user-practices/infrastructure/persistence/document/entities/user-practice.schema';
import { UserPracticeSession } from '../../../../domain/user-practice-session';
import { UserPracticeSessionSchemaClass } from '../entities/user-practice-session.schema';

export class UserPracticeSessionMapper {
  public static toDomain(
    raw: UserPracticeSessionSchemaClass,
  ): UserPracticeSession {
    const domainEntity = new UserPracticeSession();
    domainEntity.id = raw._id.toString();
    const userPractice = new UserPractice();
    userPractice.id = raw.userPractice._id.toString();
    domainEntity.userPractice = userPractice;
    domainEntity.startTime = raw.startTime;
    domainEntity.endTime = raw.endTime;
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
    const userPractice = new UserPracticeSchemaClass();
    userPractice._id = domainEntity.userPractice.id;
    persistenceSchema.userPractice = userPractice;
    persistenceSchema.startTime = domainEntity.startTime;
    persistenceSchema.endTime = domainEntity.endTime;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
