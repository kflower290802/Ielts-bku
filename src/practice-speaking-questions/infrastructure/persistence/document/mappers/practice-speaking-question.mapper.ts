import { Practice } from '../../../../../practices/domain/practice';
import { PracticeSchemaClass } from '../../../../../practices/infrastructure/persistence/document/entities/practice.schema';
import { PracticeSpeakingQuestion } from '../../../../domain/practice-speaking-question';
import { PracticeSpeakingQuestionSchemaClass } from '../entities/practice-speaking-question.schema';

export class PracticeSpeakingQuestionMapper {
  public static toDomain(
    raw: PracticeSpeakingQuestionSchemaClass,
  ): PracticeSpeakingQuestion {
    const domainEntity = new PracticeSpeakingQuestion();
    domainEntity.id = raw._id.toString();
    domainEntity.audio = raw.audio;
    const practice = new Practice();
    practice.id = raw.practice._id.toString();
    domainEntity.practice = practice;
    domainEntity.question = raw.question;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: PracticeSpeakingQuestion,
  ): PracticeSpeakingQuestionSchemaClass {
    const persistenceSchema = new PracticeSpeakingQuestionSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.audio = domainEntity.audio;
    const practice = new PracticeSchemaClass();
    practice._id = domainEntity.practice.id;
    persistenceSchema.practice = practice;
    persistenceSchema.question = domainEntity.question;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
