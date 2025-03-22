import { PracticeReadingType } from '../../../../../practice-reading-types/domain/practice-reading-type';
import { PracticeReadingTypeSchemaClass } from '../../../../../practice-reading-types/infrastructure/persistence/document/entities/practice-reading-type.schema';
import { PracticeReadingQuestion } from '../../../../domain/practice-reading-question';
import { PracticeReadingQuestionSchemaClass } from '../entities/practice-reading-question.schema';

export class PracticeReadingQuestionMapper {
  public static toDomain(
    raw: PracticeReadingQuestionSchemaClass,
  ): PracticeReadingQuestion {
    const domainEntity = new PracticeReadingQuestion();
    domainEntity.id = raw._id.toString();
    const practiceReadingType = new PracticeReadingType();
    practiceReadingType.id = raw.type._id.toString();
    domainEntity.type = practiceReadingType;
    domainEntity.question = raw.question;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: PracticeReadingQuestion,
  ): PracticeReadingQuestionSchemaClass {
    const persistenceSchema = new PracticeReadingQuestionSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.question = domainEntity.question;
    const practiceReadingType = new PracticeReadingTypeSchemaClass();
    practiceReadingType._id = domainEntity.type.id;
    persistenceSchema.type = practiceReadingType;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
