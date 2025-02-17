import { UserExamAnswer } from '../../../../domain/user-exam-answer';
import { UserExamAnswerSchemaClass } from '../entities/user-exam-answer.schema';

export class UserExamAnswerMapper {
  public static toDomain(raw: UserExamAnswerSchemaClass): UserExamAnswer {
    const domainEntity = new UserExamAnswer();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: UserExamAnswer,
  ): UserExamAnswerSchemaClass {
    const persistenceSchema = new UserExamAnswerSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
