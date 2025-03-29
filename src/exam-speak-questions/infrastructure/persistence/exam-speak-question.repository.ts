import { ExamSpeakPart } from '../../../exam-speak-parts/domain/exam-speak-part';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ExamSpeakQuestion } from '../../domain/exam-speak-question';

export abstract class ExamSpeakQuestionRepository {
  abstract create(
    data: Omit<ExamSpeakQuestion, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ExamSpeakQuestion>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ExamSpeakQuestion[]>;

  abstract findById(
    id: ExamSpeakQuestion['id'],
  ): Promise<NullableType<ExamSpeakQuestion>>;

  abstract findByIds(
    ids: ExamSpeakQuestion['id'][],
  ): Promise<ExamSpeakQuestion[]>;

  abstract update(
    id: ExamSpeakQuestion['id'],
    payload: DeepPartial<ExamSpeakQuestion>,
  ): Promise<ExamSpeakQuestion | null>;

  abstract remove(id: ExamSpeakQuestion['id']): Promise<void>;

  abstract findAllByPartId(
    partId: ExamSpeakPart['id'],
  ): Promise<ExamSpeakQuestion[]>;
}
