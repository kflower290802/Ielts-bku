import { ExamWriting } from '../../../../../exam-writings/domain/exam-writing';
import { ExamWritingSchemaClass } from '../../../../../exam-writings/infrastructure/persistence/document/entities/exam-writing.schema';
import { UserExam } from '../../../../../user-exams/domain/user-exam';
import { UserExamSchemaClass } from '../../../../../user-exams/infrastructure/persistence/document/entities/user-exam.schema';
import { UserExamWriting } from '../../../../domain/user-exam-writing';
import { UserExamWritingSchemaClass } from '../entities/user-exam-writing.schema';

export class UserExamWritingMapper {
  public static toDomain(raw: UserExamWritingSchemaClass): UserExamWriting {
    const domainEntity = new UserExamWriting();
    domainEntity.id = raw._id.toString();
    domainEntity.answer = raw.answer;
    const examWriting = new ExamWriting();
    examWriting.id = raw.examWriting._id.toString();
    domainEntity.examWriting = examWriting;
    const userExam = new UserExam();
    userExam.id = raw.userExam._id.toString();
    domainEntity.userExam = userExam;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: UserExamWriting,
  ): UserExamWritingSchemaClass {
    const persistenceSchema = new UserExamWritingSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.answer = domainEntity.answer;
    const examWriting = new ExamWritingSchemaClass();
    examWriting._id = domainEntity.examWriting.id;
    persistenceSchema.examWriting = examWriting;
    const userExam = new UserExamSchemaClass();
    userExam._id = domainEntity.userExam.id;
    persistenceSchema.userExam = userExam;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
