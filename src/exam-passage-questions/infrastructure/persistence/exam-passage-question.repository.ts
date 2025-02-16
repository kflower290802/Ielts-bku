import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ExamPassageQuestion } from '../../domain/exam-passage-question';

export abstract class ExamPassageQuestionRepository {
  abstract create(
    data: Omit<ExamPassageQuestion, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ExamPassageQuestion>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ExamPassageQuestion[]>;

  abstract findById(
    id: ExamPassageQuestion['id'],
  ): Promise<NullableType<ExamPassageQuestion>>;

  abstract findByIds(
    ids: ExamPassageQuestion['id'][],
  ): Promise<ExamPassageQuestion[]>;

  abstract update(
    id: ExamPassageQuestion['id'],
    payload: DeepPartial<ExamPassageQuestion>,
  ): Promise<ExamPassageQuestion | null>;

  abstract remove(id: ExamPassageQuestion['id']): Promise<void>;
}
