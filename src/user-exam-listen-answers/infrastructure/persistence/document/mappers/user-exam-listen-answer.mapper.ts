import { ExamListenSection } from '../../../../../exam-listen-sections/domain/exam-listen-section';
import { ExamListenSectionSchemaClass } from '../../../../../exam-listen-sections/infrastructure/persistence/document/entities/exam-listen-section.schema';
import { UserExam } from '../../../../../user-exams/domain/user-exam';
import { UserExamSchemaClass } from '../../../../../user-exams/infrastructure/persistence/document/entities/user-exam.schema';
import { UserExamListenAnswer } from '../../../../domain/user-exam-listen-answer';
import { UserExamListenAnswerSchemaClass } from '../entities/user-exam-listen-answer.schema';

export class UserExamListenAnswerMapper {
  public static toDomain(
    raw: UserExamListenAnswerSchemaClass,
  ): UserExamListenAnswer {
    const domainEntity = new UserExamListenAnswer();
    domainEntity.id = raw._id.toString();
    domainEntity.answer = raw.answer;
    const examPassageQuestionEntity = new ExamListenSection();
    examPassageQuestionEntity.id = raw.examPassageQuestion._id.toString();
    domainEntity.examPassageQuestion = examPassageQuestionEntity;
    if (raw.userExam) {
      const userExamEntity = new UserExam();
      userExamEntity.id = raw.userExam._id.toString();
      domainEntity.userExam = userExamEntity;
    }

    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: UserExamListenAnswer,
  ): UserExamListenAnswerSchemaClass {
    const persistenceSchema = new UserExamListenAnswerSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.answer = domainEntity.answer;
    const examPassageQuestionSchema = new ExamListenSectionSchemaClass();
    examPassageQuestionSchema._id = domainEntity.examPassageQuestion.id;
    persistenceSchema.examPassageQuestion = examPassageQuestionSchema;
    const userExamSchema = new UserExamSchemaClass();
    userExamSchema._id = domainEntity.userExam.id;
    persistenceSchema.userExam = userExamSchema;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
