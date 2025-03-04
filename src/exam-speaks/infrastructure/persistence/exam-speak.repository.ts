import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ExamSpeak } from '../../domain/exam-speak';

export abstract class ExamSpeakRepository {
  abstract create(
    data: Omit<ExamSpeak, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ExamSpeak>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ExamSpeak[]>;

  abstract findById(id: ExamSpeak['id']): Promise<NullableType<ExamSpeak>>;

  abstract findByIds(ids: ExamSpeak['id'][]): Promise<ExamSpeak[]>;

  abstract update(
    id: ExamSpeak['id'],
    payload: DeepPartial<ExamSpeak>,
  ): Promise<ExamSpeak | null>;

  abstract remove(id: ExamSpeak['id']): Promise<void>;

  abstract findByExamId(id: string): Promise<ExamSpeak[]>;
}
