import { ExamSchemaClass } from '../../../../../exams/infrastructure/persistence/document/entities/exam.schema';
import { ExamMapper } from '../../../../../exams/infrastructure/persistence/document/mappers/exam.mapper';
import { ExamListenSection } from '../../../../domain/exam-listen-section';
import { ExamListenSectionSchemaClass } from '../entities/exam-listen-section.schema';

export class ExamListenSectionMapper {
  public static toDomain(raw: ExamListenSectionSchemaClass): ExamListenSection {
    const domainEntity = new ExamListenSection();
    domainEntity.id = raw._id.toString();
    domainEntity.audio = raw.audio;
    if (raw.exam) {
      domainEntity.exam = ExamMapper.toDomain(raw.exam);
    }
    domainEntity.type = raw.type;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: ExamListenSection,
  ): ExamListenSectionSchemaClass {
    const persistenceSchema = new ExamListenSectionSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.audio = domainEntity.audio;
    const exam = new ExamSchemaClass();
    exam._id = domainEntity.exam.id;
    persistenceSchema.exam = exam;
    persistenceSchema.type = domainEntity.type;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
