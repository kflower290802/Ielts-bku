import { Exam } from '../../../../../exams/domain/exam';
import { ExamSchemaClass } from '../../../../../exams/infrastructure/persistence/document/entities/exam.schema';
import { ExamSpeak } from '../../../../domain/exam-speak';
import { ExamSpeakSchemaClass } from '../entities/exam-speak.schema';

export class ExamSpeakMapper {
  public static toDomain(raw: ExamSpeakSchemaClass): ExamSpeak {
    const domainEntity = new ExamSpeak();
    domainEntity.id = raw._id.toString();
    const exam = new Exam();
    exam.id = raw.exam._id.toString();
    domainEntity.exam = exam;
    domainEntity.audio = raw.audio;
    domainEntity.question = raw.question;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: ExamSpeak): ExamSpeakSchemaClass {
    const persistenceSchema = new ExamSpeakSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.audio = domainEntity.audio;
    persistenceSchema.question = domainEntity.question;
    const exam = new ExamSchemaClass();
    exam._id = domainEntity.exam.id;
    persistenceSchema.exam = exam;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
