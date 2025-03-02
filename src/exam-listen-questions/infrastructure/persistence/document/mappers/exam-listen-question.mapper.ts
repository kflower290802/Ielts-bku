import { ExamListenSectionSchemaClass } from '../../../../../exam-listen-sections/infrastructure/persistence/document/entities/exam-listen-section.schema';
import { ExamListenSectionMapper } from '../../../../../exam-listen-sections/infrastructure/persistence/document/mappers/exam-listen-section.mapper';
import { ExamListenQuestion } from '../../../../domain/exam-listen-question';
import { ExamListenQuestionSchemaClass } from '../entities/exam-listen-question.schema';

export class ExamListenQuestionMapper {
  public static toDomain(
    raw: ExamListenQuestionSchemaClass,
  ): ExamListenQuestion {
    const domainEntity = new ExamListenQuestion();
    domainEntity.id = raw._id.toString();
    domainEntity.examListenSection = ExamListenSectionMapper.toDomain(
      raw.examListenSection,
    );
    domainEntity.question = raw.question;
    domainEntity.type = raw.type;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: ExamListenQuestion,
  ): ExamListenQuestionSchemaClass {
    const persistenceSchema = new ExamListenQuestionSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    const examListenSectionSchema = new ExamListenSectionSchemaClass();
    examListenSectionSchema._id = domainEntity.examListenSection.id;
    persistenceSchema.examListenSection = examListenSectionSchema;
    persistenceSchema.question = domainEntity.question;
    persistenceSchema.type = domainEntity.type;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
