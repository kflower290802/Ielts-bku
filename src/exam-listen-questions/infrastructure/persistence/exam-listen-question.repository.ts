import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { ExamListenQuestion } from '../../domain/exam-listen-question';

export abstract class ExamListenQuestionRepository {
  abstract create(
    data: Omit<ExamListenQuestion, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ExamListenQuestion>;

  abstract findById(
    id: ExamListenQuestion['id'],
  ): Promise<NullableType<ExamListenQuestion>>;

  abstract findByIds(
    ids: ExamListenQuestion['id'][],
  ): Promise<ExamListenQuestion[]>;

  abstract update(
    id: ExamListenQuestion['id'],
    payload: DeepPartial<ExamListenQuestion>,
  ): Promise<ExamListenQuestion | null>;

  abstract remove(id: ExamListenQuestion['id']): Promise<void>;

  abstract findBySectionId(sectionId: string): Promise<ExamListenQuestion[]>;
}
