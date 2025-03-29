import { PracticeSpeakingQuestion } from '../../../../../practice-speaking-questions/domain/practice-speaking-question';
import { UserPractice } from '../../../../../user-practices/domain/user-practice';
import { UserPracticeSpeakAnswer } from '../../../../domain/user-practice-speak-answer';
import { UserPracticeSpeakAnswerSchemaClass } from '../entities/user-practice-speak-answer.schema';
import { UserPracticeSchemaClass } from '../../../../../user-practices/infrastructure/persistence/document/entities/user-practice.schema';
import { PracticeSpeakingQuestionSchemaClass } from '../../../../../practice-speaking-questions/infrastructure/persistence/document/entities/practice-speaking-question.schema';

export class UserPracticeSpeakAnswerMapper {
  public static toDomain(
    raw: UserPracticeSpeakAnswerSchemaClass,
  ): UserPracticeSpeakAnswer {
    const domainEntity = new UserPracticeSpeakAnswer();
    domainEntity.id = raw._id.toString();
    const userPractice = new UserPractice();
    userPractice.id = raw.userPractice._id.toString();
    domainEntity.userPractice = userPractice;
    const question = new PracticeSpeakingQuestion();
    question.id = raw.question._id.toString();
    domainEntity.question = question;
    domainEntity.answer = raw.answer;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: UserPracticeSpeakAnswer,
  ): UserPracticeSpeakAnswerSchemaClass {
    const persistenceSchema = new UserPracticeSpeakAnswerSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    const userPractice = new UserPracticeSchemaClass();
    userPractice._id = domainEntity.userPractice.id;
    persistenceSchema.userPractice = userPractice;
    const question = new PracticeSpeakingQuestionSchemaClass();
    question._id = domainEntity.question.id;
    persistenceSchema.question = question;
    persistenceSchema.answer = domainEntity.answer;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
