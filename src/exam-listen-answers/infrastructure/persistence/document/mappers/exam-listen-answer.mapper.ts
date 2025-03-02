import { ExamListenQuestion } from '../../../../../exam-listen-questions/domain/exam-listen-question';
import { ExamListenQuestionSchemaClass } from '../../../../../exam-listen-questions/infrastructure/persistence/document/entities/exam-listen-question.schema';
import { ExamListenAnswer } from '../../../../domain/exam-listen-answer';
import { ExamListenAnswerSchemaClass } from '../entities/exam-listen-answer.schema';

export class ExamListenAnswerMapper {
  public static toDomain(raw: ExamListenAnswerSchemaClass): ExamListenAnswer {
    const domainEntity = new ExamListenAnswer();
    domainEntity.id = raw._id.toString();
    const examListenQuestion = new ExamListenQuestion();
    examListenQuestion.id = raw.examListenQuestion._id.toString();
    domainEntity.examListenQuestion = examListenQuestion;
    domainEntity.isCorrect = raw.isCorrect;
    domainEntity.answer = raw.answer;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: ExamListenAnswer,
  ): ExamListenAnswerSchemaClass {
    const persistenceSchema = new ExamListenAnswerSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    const examListenQuestionSchema = new ExamListenQuestionSchemaClass();
    examListenQuestionSchema._id = domainEntity.examListenQuestion.id;
    persistenceSchema.answer = domainEntity.answer;
    persistenceSchema.isCorrect = domainEntity.isCorrect;
    persistenceSchema.examListenQuestion = examListenQuestionSchema;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
