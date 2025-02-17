import { UserExam } from '../../../../../user-exams/domain/user-exam';
import { UserExamSchemaClass } from '../../../../../user-exams/infrastructure/persistence/document/entities/user-exam.schema';
import { UserExamSession } from '../../../../domain/user-exam-session';
import { UserExamSessionSchemaClass } from '../entities/user-exam-session.schema';

export class UserExamSessionMapper {
  public static toDomain(raw: UserExamSessionSchemaClass): UserExamSession {
    const domainEntity = new UserExamSession();
    domainEntity.id = raw._id.toString();
    domainEntity.startTime = raw.startTime;
    domainEntity.endTime = raw.endTime;
    const userExamEntity = new UserExam();
    userExamEntity.id = raw.userExam._id.toString();
    domainEntity.userExam = userExamEntity;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    return domainEntity;
  }

  public static toPersistence(
    domainEntity: UserExamSession,
  ): UserExamSessionSchemaClass {
    const persistenceSchema = new UserExamSessionSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.startTime = domainEntity.startTime;
    persistenceSchema.endTime = domainEntity.endTime;
    const userExam = new UserExamSchemaClass();
    if (domainEntity.userExam.id) {
      userExam._id = domainEntity.userExam.id;
    }
    persistenceSchema.userExam = userExam;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
