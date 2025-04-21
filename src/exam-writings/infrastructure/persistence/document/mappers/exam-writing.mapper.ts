import { Exam } from '../../../../../exams/domain/exam';
import { ExamSchemaClass } from '../../../../../exams/infrastructure/persistence/document/entities/exam.schema';
import { ExamWriting } from '../../../../domain/exam-writing';
import { ExamWritingSchemaClass } from '../entities/exam-writing.schema';

export class ExamWritingMapper {
  public static toDomain(raw: ExamWritingSchemaClass): ExamWriting {
    const domainEntity = new ExamWriting();
    domainEntity.id = raw._id.toString();
    domainEntity.content = raw.content;
    const exam = new Exam();
    exam.id = raw.exam._id.toString();
    domainEntity.exam = exam;
    domainEntity.image = raw.image;
    domainEntity.imageDetails = raw.imageDetails;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: ExamWriting,
  ): ExamWritingSchemaClass {
    const persistenceSchema = new ExamWritingSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.content = domainEntity.content;
    const exam = new ExamSchemaClass();
    exam._id = domainEntity.exam.id;
    persistenceSchema.exam = exam;
    persistenceSchema.image = domainEntity.image;
    persistenceSchema.imageDetails = domainEntity.imageDetails;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
