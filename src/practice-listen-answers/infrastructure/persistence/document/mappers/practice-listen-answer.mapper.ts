import { PracticeListenQuestion } from '../../../../../practice-listen-questions/domain/practice-listen-question';
import { PracticeListenQuestionSchemaClass } from '../../../../../practice-listen-questions/infrastructure/persistence/document/entities/practice-listen-question.schema';
import { PracticeListenAnswer } from '../../../../domain/practice-listen-answer';
import { PracticeListenAnswerSchemaClass } from '../entities/practice-listen-answer.schema';

export class PracticeListenAnswerMapper {
  public static toDomain(
    raw: PracticeListenAnswerSchemaClass,
  ): PracticeListenAnswer {
    const domainEntity = new PracticeListenAnswer();
    domainEntity.id = raw._id.toString();
    domainEntity.answer = raw.answer;
    domainEntity.isCorrect = raw.isCorrect;
    const question = new PracticeListenQuestion();
    question.id = raw.question._id.toString();
    domainEntity.question = question;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: PracticeListenAnswer,
  ): PracticeListenAnswerSchemaClass {
    const persistenceSchema = new PracticeListenAnswerSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.answer = domainEntity.answer;
    persistenceSchema.isCorrect = domainEntity.isCorrect;
    const question = new PracticeListenQuestionSchemaClass();
    question._id = domainEntity.question.id;
    persistenceSchema.question = question;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
