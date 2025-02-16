import { Exam } from '../../../exams/domain/exam';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ExamPassage } from '../../domain/exam-passage';

export abstract class ExamPassageRepository {
  abstract create(
    data: Omit<ExamPassage, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ExamPassage>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ExamPassage[]>;

  abstract findById(id: ExamPassage['id']): Promise<NullableType<ExamPassage>>;

  abstract findByIds(ids: ExamPassage['id'][]): Promise<ExamPassage[]>;

  abstract update(
    id: ExamPassage['id'],
    payload: DeepPartial<ExamPassage>,
  ): Promise<ExamPassage | null>;

  abstract remove(id: ExamPassage['id']): Promise<void>;

  abstract findByExamId(id: Exam['id']): Promise<ExamPassage[]>;
}
