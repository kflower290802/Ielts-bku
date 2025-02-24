import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ExamPassageAnswer } from '../../domain/exam-passage-answer';

export abstract class ExamPassageAnswerRepository {
  abstract create(
    data: Omit<ExamPassageAnswer, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ExamPassageAnswer>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ExamPassageAnswer[]>;

  abstract findById(
    id: ExamPassageAnswer['id'],
  ): Promise<NullableType<ExamPassageAnswer>>;

  abstract findByIds(
    ids: ExamPassageAnswer['id'][],
  ): Promise<ExamPassageAnswer[]>;

  abstract update(
    id: ExamPassageAnswer['id'],
    payload: DeepPartial<ExamPassageAnswer>,
  ): Promise<ExamPassageAnswer | null>;

  abstract remove(id: ExamPassageAnswer['id']): Promise<void>;

  abstract findByQuestionId(
    questionId: string,
  ): Promise<NullableType<ExamPassageAnswer>>;
}
