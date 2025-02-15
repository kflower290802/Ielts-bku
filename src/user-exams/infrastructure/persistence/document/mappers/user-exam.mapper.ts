import { Exam } from '../../../../../exams/domain/exam';
import { ExamSchemaClass } from '../../../../../exams/infrastructure/persistence/document/entities/exam.schema';
import { User } from '../../../../../users/domain/user';
import { UserSchemaClass } from '../../../../../users/infrastructure/persistence/document/entities/user.schema';
import { UserExam } from '../../../../domain/user-exam';
import { UserExamSchemaClass } from '../entities/user-exam.schema';

export class UserExamMapper {
  public static toDomain(raw: UserExamSchemaClass): UserExam {
    const domainEntity = new UserExam();
    domainEntity.id = raw._id.toString();
    const examEntity = new Exam();
    examEntity.id = raw.exam._id.toString();
    domainEntity.exam = examEntity;
    domainEntity.progress = raw.progress;
    domainEntity.score = raw.score;
    const userEntity = new User();
    userEntity.id = raw.user._id.toString();
    domainEntity.user = userEntity;
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
