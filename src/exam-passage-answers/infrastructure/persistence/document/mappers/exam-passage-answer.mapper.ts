import { ExamPassageQuestion } from '../../../../../exam-passage-questions/domain/exam-passage-question';
import { ExamPassageQuestionSchemaClass } from '../../../../../exam-passage-questions/infrastructure/persistence/document/entities/exam-passage-question.schema';
import { ExamPassageAnswer } from '../../../../domain/exam-passage-answer';
import { ExamPassageAnswerSchemaClass } from '../entities/exam-passage-answer.schema';

export class ExamPassageAnswerMapper {
  public static toDomain(raw: ExamPassageAnswerSchemaClass): ExamPassageAnswer {
    const domainEntity = new ExamPassageAnswer();
    domainEntity.id = raw._id.toString();
    domainEntity.answer = raw.answer;
    const question = new ExamPassageQuestion();
    question.id = raw.question._id.toString();
    domainEntity.question = question;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    return domainEntity;
  }

  public static toPersistence(
    domainEntity: ExamPassageAnswer,
  ): ExamPassageAnswerSchemaClass {
    const persistenceSchema = new ExamPassageAnswerSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.answer = domainEntity.answer;
    const question = new ExamPassageQuestionSchemaClass();
    question._id = domainEntity.question.id;
    persistenceSchema.question = question;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
