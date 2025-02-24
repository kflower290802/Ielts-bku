import { ExamPassage } from '../../../../../exam-passages/domain/exam-passage';
import { ExamPassageSchemaClass } from '../../../../../exam-passages/infrastructure/persistence/document/entities/exam-passage.schema';
import { ExamPassageQuestion } from '../../../../domain/exam-passage-question';
import { ExamPassageQuestionSchemaClass } from '../entities/exam-passage-question.schema';

export class ExamPassageQuestionMapper {
  public static toDomain(
    raw: ExamPassageQuestionSchemaClass,
  ): ExamPassageQuestion {
    const domainEntity = new ExamPassageQuestion();
    domainEntity.id = raw._id.toString();
    const examPassage = new ExamPassage();
    examPassage.id = raw.examPassage._id.toString();
    domainEntity.examPassage = examPassage;
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
    const examPassage = new ExamPassageSchemaClass();
    examPassage._id = domainEntity.examPassage.id;
    persistenceSchema.examPassage = examPassage;
    persistenceSchema.question = domainEntity.question;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
