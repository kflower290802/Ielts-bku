import { ExamReadingType } from '../../../../../exam-reading-types/domain/exam-reading-type';
import { ExamReadingTypeSchemaClass } from '../../../../../exam-reading-types/infrastructure/persistence/document/entities/exam-reading-type.schema';
import { ExamPassageQuestion } from '../../../../domain/exam-passage-question';
import { ExamPassageQuestionSchemaClass } from '../entities/exam-passage-question.schema';

export class ExamPassageQuestionMapper {
  public static toDomain(
    raw: ExamPassageQuestionSchemaClass,
  ): ExamPassageQuestion {
    const domainEntity = new ExamPassageQuestion();
    domainEntity.id = raw._id.toString();
    const examReadingType = new ExamReadingType();
    examReadingType.id = raw.examReadingType._id.toString();
    domainEntity.examReadingType = examReadingType;
    domainEntity.question = raw.question;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: ExamPassageQuestion,
  ): ExamPassageQuestionSchemaClass {
    const persistenceSchema = new ExamPassageQuestionSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    const examReadingType = new ExamReadingTypeSchemaClass();
    examReadingType._id = domainEntity.examReadingType.id;
    persistenceSchema.examReadingType = examReadingType;
    persistenceSchema.question = domainEntity.question;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
