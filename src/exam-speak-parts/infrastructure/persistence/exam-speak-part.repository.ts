import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ExamSpeakPart } from '../../domain/exam-speak-part';

export abstract class ExamSpeakPartRepository {
  abstract create(
    data: Omit<ExamSpeakPart, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ExamSpeakPart>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ExamSpeakPart[]>;

  abstract findById(
    id: ExamSpeakPart['id'],
  ): Promise<NullableType<ExamSpeakPart>>;

  abstract findByIds(ids: ExamSpeakPart['id'][]): Promise<ExamSpeakPart[]>;

  abstract update(
    id: ExamSpeakPart['id'],
    payload: DeepPartial<ExamSpeakPart>,
  ): Promise<ExamSpeakPart | null>;

  abstract remove(id: ExamSpeakPart['id']): Promise<void>;

  abstract findAllByExamId(examId: string): Promise<ExamSpeakPart[]>;
}
