import { Exam } from '../../../../../exams/domain/exam';
import { ExamSchemaClass } from '../../../../../exams/infrastructure/persistence/document/entities/exam.schema';
import { ExamPassage } from '../../../../domain/exam-passage';
import { ExamPassageSchemaClass } from '../entities/exam-passage.schema';

export class ExamPassageMapper {
  public static toDomain(raw: ExamPassageSchemaClass): ExamPassage {
    const domainEntity = new ExamPassage();
    domainEntity.id = raw._id.toString();
    const exam = new Exam();
    exam.id = raw.exam._id.toString();
    domainEntity.exam = exam;
    domainEntity.passage = raw.passage;
    domainEntity.title = raw.title;
    domainEntity.type = raw.type;
    domainEntity.blankPassage = raw.blankPassage;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: ExamPassage,
  ): ExamPassageSchemaClass {
    const persistenceSchema = new ExamPassageSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.passage = domainEntity.passage;
    const exam = new ExamSchemaClass();
    exam._id = domainEntity.exam.id;
    persistenceSchema.exam = exam;
    persistenceSchema.type = domainEntity.type;
    persistenceSchema.title = domainEntity.title;
    persistenceSchema.blankPassage = domainEntity.blankPassage;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
