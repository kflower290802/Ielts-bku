import { Exam } from '../../../exams/domain/exam';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { ExamListenSection } from '../../domain/exam-listen-section';

export abstract class ExamListenSectionRepository {
  abstract create(
    data: Omit<ExamListenSection, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ExamListenSection>;

  abstract findSectionsByExamId(exam: Exam['id']): Promise<ExamListenSection[]>;

  abstract findById(
    id: ExamListenSection['id'],
  ): Promise<NullableType<ExamListenSection>>;

  abstract findByIds(
    ids: ExamListenSection['id'][],
  ): Promise<ExamListenSection[]>;

  abstract update(
    id: ExamListenSection['id'],
    payload: DeepPartial<ExamListenSection>,
  ): Promise<ExamListenSection | null>;

  abstract remove(id: ExamListenSection['id']): Promise<void>;
}
