import { PracticeReadingQuestion } from '../../../../../practice-reading-questions/domain/practice-reading-question';
import { PracticeReadingQuestionSchemaClass } from '../../../../../practice-reading-questions/infrastructure/persistence/document/entities/practice-reading-question.schema';
import { PracticeReadingAnswer } from '../../../../domain/practice-reading-answer';
import { PracticeReadingAnswerSchemaClass } from '../entities/practice-reading-answer.schema';

export class PracticeReadingAnswerMapper {
  public static toDomain(
    raw: PracticeReadingAnswerSchemaClass,
  ): PracticeReadingAnswer {
    const domainEntity = new PracticeReadingAnswer();
    domainEntity.id = raw._id.toString();
    const question = new PracticeReadingQuestion();
    question.id = raw.question._id.toString();
    domainEntity.answer = raw.answer;
    domainEntity.isCorrect = raw.isCorrect;
    domainEntity.question = question;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: PracticeReadingAnswer,
  ): PracticeReadingAnswerSchemaClass {
    const persistenceSchema = new PracticeReadingAnswerSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.answer = domainEntity.answer;
    persistenceSchema.isCorrect = domainEntity.isCorrect;
    const question = new PracticeReadingQuestionSchemaClass();
    question._id = domainEntity.question.id;
    persistenceSchema.question = question;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
