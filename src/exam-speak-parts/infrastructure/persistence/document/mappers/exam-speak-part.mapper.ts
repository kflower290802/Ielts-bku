import { ExamSpeakPart } from '../../../../domain/exam-speak-part';
import { ExamSpeakPartSchemaClass } from '../entities/exam-speak-part.schema';
import { Exam } from '../../../../../exams/domain/exam';
import { ExamSchemaClass } from '../../../../../exams/infrastructure/persistence/document/entities/exam.schema';
export class ExamSpeakPartMapper {
  public static toDomain(raw: ExamSpeakPartSchemaClass): ExamSpeakPart {
    const domainEntity = new ExamSpeakPart();
    domainEntity.id = raw._id.toString();
    const exam = new Exam();
    exam.id = raw.exam._id.toString();
    domainEntity.exam = exam;
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
    const examSchema = new ExamSchemaClass();
    examSchema._id = domainEntity.exam.id;
    persistenceSchema.exam = examSchema;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
