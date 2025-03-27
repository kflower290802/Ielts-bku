import { UserPractice } from '../../../../../user-practices/domain/user-practice';
import { UserPracticeSchemaClass } from '../../../../../user-practices/infrastructure/persistence/document/entities/user-practice.schema';
import { UserPracticeWritingAnswer } from '../../../../domain/user-practice-writing-answer';
import { UserPracticeWritingAnswerSchemaClass } from '../entities/user-practice-writing-answer.schema';

export class UserPracticeWritingAnswerMapper {
  public static toDomain(
    raw: UserPracticeWritingAnswerSchemaClass,
  ): UserPracticeWritingAnswer {
    const domainEntity = new UserPracticeWritingAnswer();
    domainEntity.id = raw._id.toString();
    const userPractice = new UserPractice();
    userPractice.id = raw.userPractice._id.toString();
    domainEntity.userPractice = userPractice;
    domainEntity.answer = raw.answer;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: UserPracticeWritingAnswer,
  ): UserPracticeWritingAnswerSchemaClass {
    const persistenceSchema = new UserPracticeWritingAnswerSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    const userPractice = new UserPracticeSchemaClass();
    userPractice._id = domainEntity.userPractice.id;
    persistenceSchema.userPractice = userPractice;
    persistenceSchema.answer = domainEntity.answer;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
