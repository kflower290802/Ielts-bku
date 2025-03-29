import { UserExam } from '../../../../../user-exams/domain/user-exam';
import { UserExamSchemaClass } from '../../../../../user-exams/infrastructure/persistence/document/entities/user-exam.schema';
import { UserExamSpeakAnswer } from '../../../../domain/user-exam-speak-answer';
import { UserExamSpeakAnswerSchemaClass } from '../entities/user-exam-speak-answer.schema';
import { ExamSpeakQuestion } from '../../../../../exam-speak-questions/domain/exam-speak-question';
import { ExamSpeakQuestionSchemaClass } from '../../../../../exam-speak-questions/infrastructure/persistence/document/entities/exam-speak-question.schema';

export class UserExamSpeakAnswerMapper {
  public static toDomain(
    raw: UserExamSpeakAnswerSchemaClass,
  ): UserExamSpeakAnswer {
    const domainEntity = new UserExamSpeakAnswer();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.answer = raw.answer;
    const userExam = new UserExam();
    userExam.id = raw.userExam._id.toString();
    const question = new ExamSpeakQuestion();
    question.id = raw.question._id.toString();
    domainEntity.question = question;
    domainEntity.userExam = userExam;
    return domainEntity;
  }

  public static toPersistence(
    domainEntity: UserExamSpeakAnswer,
  ): UserExamSpeakAnswerSchemaClass {
    const persistenceSchema = new UserExamSpeakAnswerSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.answer = domainEntity.answer;
    const userExam = new UserExamSchemaClass();
    userExam._id = domainEntity.userExam.id;
    persistenceSchema.userExam = userExam;
    const question = new ExamSpeakQuestionSchemaClass();
    question._id = domainEntity.question.id;
    persistenceSchema.question = question;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
