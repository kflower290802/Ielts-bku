import { question_result } from '../../../../domain/question-result';
import { question_resultSchemaClass } from '../entities/question-result.schema';

export class question_resultMapper {
  public static toDomain(raw: question_resultSchemaClass): question_result {
    const domainEntity = new question_result();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: question_result,
  ): question_resultSchemaClass {
    const persistenceSchema = new question_resultSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
