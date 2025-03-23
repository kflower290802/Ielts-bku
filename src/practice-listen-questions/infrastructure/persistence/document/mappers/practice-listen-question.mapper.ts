import { PracticeListenType } from '../../../../../practice-listen-types/domain/practice-listen-type';
import { PracticeListenTypeSchemaClass } from '../../../../../practice-listen-types/infrastructure/persistence/document/entities/practice-listen-type.schema';
import { PracticeListenQuestion } from '../../../../domain/practice-listen-question';
import { PracticeListenQuestionSchemaClass } from '../entities/practice-listen-question.schema';

export class PracticeListenQuestionMapper {
  public static toDomain(
    raw: PracticeListenQuestionSchemaClass,
  ): PracticeListenQuestion {
    const domainEntity = new PracticeListenQuestion();
    domainEntity.id = raw._id.toString();
    const type = new PracticeListenType();
    type.id = raw.type._id.toString();
    domainEntity.type = type;
    domainEntity.question = raw.question;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: PracticeListenQuestion,
  ): PracticeListenQuestionSchemaClass {
    const persistenceSchema = new PracticeListenQuestionSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.question = domainEntity.question;
    const type = new PracticeListenTypeSchemaClass();
    type._id = domainEntity.type.id;
    persistenceSchema.type = type;
    persistenceSchema.question = domainEntity.question;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
