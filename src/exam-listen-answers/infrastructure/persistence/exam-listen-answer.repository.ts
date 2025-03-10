import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { ExamListenAnswer } from '../../domain/exam-listen-answer';

export abstract class ExamListenAnswerRepository {
  abstract create(
    data: Omit<ExamListenAnswer, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ExamListenAnswer>;

  abstract findById(
    id: ExamListenAnswer['id'],
  ): Promise<NullableType<ExamListenAnswer>>;

  abstract findByIds(
    ids: ExamListenAnswer['id'][],
  ): Promise<ExamListenAnswer[]>;

  abstract update(
    id: ExamListenAnswer['id'],
    payload: DeepPartial<ExamListenAnswer>,
  ): Promise<ExamListenAnswer | null>;

  abstract remove(id: ExamListenAnswer['id']): Promise<void>;

  abstract findByQuestionId(questionId: string): Promise<ExamListenAnswer[]>;

  abstract findCorrectAnswersByQuestionId(
    questionId: string,
  ): Promise<ExamListenAnswer[]>;
}
