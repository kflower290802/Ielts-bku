import { ExamPassageQuestion } from '../../../exam-passage-questions/domain/exam-passage-question';
import { UserExam } from '../../../user-exams/domain/user-exam';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { UserExamAnswer } from '../../domain/user-exam-answer';

export abstract class UserExamAnswerRepository {
  abstract create(
    data: Omit<UserExamAnswer, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserExamAnswer>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<UserExamAnswer[]>;

  abstract findById(
    id: UserExamAnswer['id'],
  ): Promise<NullableType<UserExamAnswer>>;

  abstract findByIds(ids: UserExamAnswer['id'][]): Promise<UserExamAnswer[]>;

  abstract update(
    id: UserExamAnswer['id'],
    payload: DeepPartial<UserExamAnswer>,
  ): Promise<UserExamAnswer | null>;

  abstract remove(id: UserExamAnswer['id']): Promise<void>;

  abstract findByUserExamAndExamPassageQuestion(
    userExamId: UserExam['id'],
    examPassageQuestionId: ExamPassageQuestion['id'],
  ): Promise<NullableType<UserExamAnswer>>;

  abstract findByUserExamId(
    userExam: UserExam['id'],
  ): Promise<UserExamAnswer[]>;
}
