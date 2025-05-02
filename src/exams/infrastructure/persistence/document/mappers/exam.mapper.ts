import { Exam } from '../../../../domain/exam';
import { ExamSchemaClass } from '../entities/exam.schema';

export class ExamMapper {
  public static toDomain(raw: ExamSchemaClass): Exam {
    const domainEntity = new Exam();
    domainEntity.id = raw._id.toString();
    domainEntity.name = raw.name;
    domainEntity.image = raw.image;
    domainEntity.time = raw.time;
    domainEntity.type = raw.type;
    domainEntity.year = raw.year;
    domainEntity.audio = raw.audio;
    domainEntity.isDeleted = raw.isDeleted;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: Exam): ExamSchemaClass {
    const persistenceSchema = new ExamSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.name = domainEntity.name;
    persistenceSchema.image = domainEntity.image;
    persistenceSchema.time = domainEntity.time;
    persistenceSchema.audio = domainEntity.audio;
    persistenceSchema.type = domainEntity.type;
    persistenceSchema.year = domainEntity.year;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;
    persistenceSchema.isDeleted = domainEntity.isDeleted;
    return persistenceSchema;
  }
}
