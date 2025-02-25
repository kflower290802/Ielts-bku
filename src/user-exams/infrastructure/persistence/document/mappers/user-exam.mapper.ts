import { ExamSchemaClass } from '../../../../../exams/infrastructure/persistence/document/entities/exam.schema';
import { ExamMapper } from '../../../../../exams/infrastructure/persistence/document/mappers/exam.mapper';
import { UserSchemaClass } from '../../../../../users/infrastructure/persistence/document/entities/user.schema';
import { UserMapper } from '../../../../../users/infrastructure/persistence/document/mappers/user.mapper';
import { UserExam } from '../../../../domain/user-exam';
import { UserExamSchemaClass } from '../entities/user-exam.schema';

export class UserExamMapper {
  public static toDomain(raw: UserExamSchemaClass): UserExam {
    const domainEntity = new UserExam();
    domainEntity.id = raw._id.toString();
    domainEntity.exam = ExamMapper.toDomain(raw.exam);
    domainEntity.progress = raw.progress;
    domainEntity.score = raw.score;
    domainEntity.user = UserMapper.toDomain(raw.user);
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: UserExam): UserExamSchemaClass {
    const persistenceSchema = new UserExamSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    const exam = new ExamSchemaClass();
    exam._id = domainEntity.exam.id;
    persistenceSchema.exam = exam;
    persistenceSchema.progress = domainEntity.progress;
    persistenceSchema.score = domainEntity.score;
    const user = new UserSchemaClass();
    user._id = domainEntity.user.id;
    persistenceSchema.user = user;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
