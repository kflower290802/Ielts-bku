import { ExamListenType } from '../../../../../exam-listen-types/domain/exam-listen-type';
import { ExamListenTypeSchemaClass } from '../../../../../exam-listen-types/infrastructure/persistence/document/entities/exam-listen-type.schema';
import { ExamListenQuestion } from '../../../../domain/exam-listen-question';
import { ExamListenQuestionSchemaClass } from '../entities/exam-listen-question.schema';

export class ExamListenQuestionMapper {
  public static toDomain(
    raw: ExamListenQuestionSchemaClass,
  ): ExamListenQuestion {
    const domainEntity = new ExamListenQuestion();
    domainEntity.id = raw._id.toString();
    const examListenType = new ExamListenType();
    examListenType.id = raw.examListenType._id.toString();
    domainEntity.examListenType = examListenType;
    domainEntity.question = raw.question;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: ExamListenQuestion,
  ): ExamListenQuestionSchemaClass {
    const persistenceSchema = new ExamListenQuestionSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    const examListenTypeSchema = new ExamListenTypeSchemaClass();

    examListenTypeSchema._id = domainEntity.examListenType.id;
    persistenceSchema.examListenType = examListenTypeSchema;
    persistenceSchema.question = domainEntity.question;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
