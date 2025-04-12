import { Practice } from '../../../../../practices/domain/practice';
import { PracticeSchemaClass } from '../../../../../practices/infrastructure/persistence/document/entities/practice.schema';
import { User } from '../../../../../users/domain/user';
import { UserSchemaClass } from '../../../../../users/infrastructure/persistence/document/entities/user.schema';
import { UserPractice } from '../../../../domain/user-practice';
import { UserPracticeSchemaClass } from '../entities/user-practice.schema';

export class UserPracticeMapper {
  public static toDomain(raw: UserPracticeSchemaClass): UserPractice {
    const domainEntity = new UserPractice();
    domainEntity.id = raw._id.toString();
    const practice = new Practice();
    practice.id = raw.practice._id.toString();
    domainEntity.practice = practice;
    const user = new User();
    domainEntity.isCompleted = raw.isCompleted;
    user.id = raw.user._id.toString();
    domainEntity.user = user;
    domainEntity.score = raw.score;
    domainEntity.taskResponse = raw.taskResponse;
    domainEntity.coherenceAndCohesion = raw.coherenceAndCohesion;
    domainEntity.lexicalResource = raw.lexicalResource;
    domainEntity.grammaticalRangeAndAccuracy = raw.grammaticalRangeAndAccuracy;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: UserPractice,
  ): UserPracticeSchemaClass {
    const persistenceSchema = new UserPracticeSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    const userSchema = new UserSchemaClass();
    userSchema._id = domainEntity.user.id;
    persistenceSchema.user = userSchema;
    const practiceSchema = new PracticeSchemaClass();
    practiceSchema._id = domainEntity.practice.id;
    persistenceSchema.practice = practiceSchema;
    persistenceSchema.isCompleted = domainEntity.isCompleted;
    persistenceSchema.score = domainEntity.score;
    persistenceSchema.taskResponse = domainEntity.taskResponse;
    persistenceSchema.coherenceAndCohesion = domainEntity.coherenceAndCohesion;
    persistenceSchema.lexicalResource = domainEntity.lexicalResource;
    persistenceSchema.grammaticalRangeAndAccuracy =
      domainEntity.grammaticalRangeAndAccuracy;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
