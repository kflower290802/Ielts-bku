import { ExamSpeak } from '../../../../../exam-speaks/domain/exam-speak';
import { ExamSpeakSchemaClass } from '../../../../../exam-speaks/infrastructure/persistence/document/entities/exam-speak.schema';
import { ExamSpeakPart } from '../../../../domain/exam-speak-part';
import { ExamSpeakPartSchemaClass } from '../entities/exam-speak-part.schema';

export class ExamSpeakPartMapper {
  public static toDomain(raw: ExamSpeakPartSchemaClass): ExamSpeakPart {
    const domainEntity = new ExamSpeakPart();
    domainEntity.id = raw._id.toString();
    const examSpeak = new ExamSpeak();
    examSpeak.id = raw.examSpeak._id.toString();
    domainEntity.examSpeak = examSpeak;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: ExamSpeakPart,
  ): ExamSpeakPartSchemaClass {
    const persistenceSchema = new ExamSpeakPartSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    const examSpeakSchema = new ExamSpeakSchemaClass();
    examSpeakSchema._id = domainEntity.examSpeak.id;
    persistenceSchema.examSpeak = examSpeakSchema;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
