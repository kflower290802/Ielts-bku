import { ExamPassageQuestion } from '../../../../../exam-passage-questions/domain/exam-passage-question';
import { ExamPassageQuestionSchemaClass } from '../../../../../exam-passage-questions/infrastructure/persistence/document/entities/exam-passage-question.schema';
import { UserExam } from '../../../../../user-exams/domain/user-exam';
import { UserExamSchemaClass } from '../../../../../user-exams/infrastructure/persistence/document/entities/user-exam.schema';
import { UserExamAnswer } from '../../../../domain/user-exam-answer';
import { UserExamAnswerSchemaClass } from '../entities/user-exam-answer.schema';

export class UserExamAnswerMapper {
  public static toDomain(raw: UserExamAnswerSchemaClass): UserExamAnswer {
    const domainEntity = new UserExamAnswer();
    domainEntity.id = raw._id.toString();
    const userExam = new UserExam();
    userExam.id = raw.userExam._id.toString();
    domainEntity.userExam = userExam;
    const examPassageQuestion = new ExamPassageQuestion();
    examPassageQuestion.id = raw.examPassageQuestion._id.toString();
    domainEntity.examPassageQuestion = examPassageQuestion;
    domainEntity.answer = raw.answer;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: UserExamAnswer,
  ): UserExamAnswerSchemaClass {
    const persistenceSchema = new UserExamAnswerSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    const userExam = new UserExamSchemaClass();
    userExam._id = domainEntity.userExam.id;
    persistenceSchema.userExam = userExam;
    const examPassageQuestion = new ExamPassageQuestionSchemaClass();
    examPassageQuestion._id = domainEntity.examPassageQuestion.id;
    persistenceSchema.examPassageQuestion = examPassageQuestion;
    persistenceSchema.answer = domainEntity.answer;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
