import { ExamSpeakQuestion } from '../../../../domain/exam-speak-question';
import { ExamSpeakQuestionSchemaClass } from '../entities/exam-speak-question.schema';
import { ExamSpeakPart } from '../../../../../exam-speak-parts/domain/exam-speak-part';
import { ExamSpeakPartSchemaClass } from '../../../../../exam-speak-parts/infrastructure/persistence/document/entities/exam-speak-part.schema';

export class ExamSpeakQuestionMapper {
  public static toDomain(raw: ExamSpeakQuestionSchemaClass): ExamSpeakQuestion {
    const domainEntity = new ExamSpeakQuestion();
    domainEntity.id = raw._id.toString();
    const examSpeakPart = new ExamSpeakPart();
    examSpeakPart.id = raw.part._id.toString();
    domainEntity.part = examSpeakPart;
    domainEntity.question = raw.question;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: ExamSpeakQuestion,
  ): ExamSpeakQuestionSchemaClass {
    const persistenceSchema = new ExamSpeakQuestionSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    const examSpeakPart = new ExamSpeakPartSchemaClass();
    examSpeakPart._id = domainEntity.part.id;
    persistenceSchema.part = examSpeakPart;
    persistenceSchema.question = domainEntity.question;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
