import { UserExam } from '../../../../domain/user-exam';
import { UserExamSchemaClass } from '../entities/user-exam.schema';

export class UserExamMapper {
  public static toDomain(raw: UserExamSchemaClass): UserExam {
    const domainEntity = new UserExam();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: UserExam): UserExamSchemaClass {
    const persistenceSchema = new UserExamSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
