import { PracticeListenQuestion } from '../../../../../practice-listen-questions/domain/practice-listen-question';
import { PracticeListenQuestionSchemaClass } from '../../../../../practice-listen-questions/infrastructure/persistence/document/entities/practice-listen-question.schema';
import { UserPractice } from '../../../../../user-practices/domain/user-practice';
import { UserPracticeSchemaClass } from '../../../../../user-practices/infrastructure/persistence/document/entities/user-practice.schema';
import { UserPracticeListenAnswer } from '../../../../domain/user-practice-listen-answer';
import { UserPracticeListenAnswerSchemaClass } from '../entities/user-practice-listen-answer.schema';

export class UserPracticeListenAnswerMapper {
  public static toDomain(
    raw: UserPracticeListenAnswerSchemaClass,
  ): UserPracticeListenAnswer {
    const domainEntity = new UserPracticeListenAnswer();
    domainEntity.id = raw._id.toString();
    domainEntity.answer = raw.answer;
    const question = new PracticeListenQuestion();
    question.id = raw.question._id.toString();
    domainEntity.question = question;
    const userPractice = new UserPractice();
    userPractice.id = raw.userPractice._id.toString();
    domainEntity.userPractice = userPractice;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: UserPracticeListenAnswer,
  ): UserPracticeListenAnswerSchemaClass {
    const persistenceSchema = new UserPracticeListenAnswerSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.answer = domainEntity.answer;
    const question = new PracticeListenQuestionSchemaClass();
    question._id = domainEntity.question.id;
    persistenceSchema.question = question;
    const userPractice = new UserPracticeSchemaClass();
    userPractice._id = domainEntity.userPractice.id;
    persistenceSchema.userPractice = userPractice;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
