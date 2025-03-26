import { PracticeReadingQuestion } from '../../../../../practice-reading-questions/domain/practice-reading-question';
import { PracticeReadingQuestionSchemaClass } from '../../../../../practice-reading-questions/infrastructure/persistence/document/entities/practice-reading-question.schema';
import { UserPractice } from '../../../../../user-practices/domain/user-practice';
import { UserPracticeSchemaClass } from '../../../../../user-practices/infrastructure/persistence/document/entities/user-practice.schema';
import { UserPracticeReadingAnswer } from '../../../../domain/user-practice-reading-answer';
import { UserPracticeReadingAnswerSchemaClass } from '../entities/user-practice-reading-answer.schema';

export class UserPracticeReadingAnswerMapper {
  public static toDomain(
    raw: UserPracticeReadingAnswerSchemaClass,
  ): UserPracticeReadingAnswer {
    const domainEntity = new UserPracticeReadingAnswer();
    domainEntity.id = raw._id.toString();
    domainEntity.answer = raw.answer;
    const question = new PracticeReadingQuestion();
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
    domainEntity: UserPracticeReadingAnswer,
  ): UserPracticeReadingAnswerSchemaClass {
    const persistenceSchema = new UserPracticeReadingAnswerSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.answer = domainEntity.answer;
    const question = new PracticeReadingQuestionSchemaClass();
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
