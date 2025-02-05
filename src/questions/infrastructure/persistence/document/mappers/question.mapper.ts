import { question } from '../../../../domain/question';
import { questionSchemaClass } from '../entities/question.schema';

export class questionMapper {
  public static toDomain(raw: questionSchemaClass): question {
    const domainEntity = new question();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: question): questionSchemaClass {
    const persistenceSchema = new questionSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
