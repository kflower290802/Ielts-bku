import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { Exam } from '../../domain/exam';
import { ExamType } from '../../exams.type';

export abstract class ExamRepository {
  abstract create(
    data: Omit<Exam, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Exam>;

  abstract findAllWithPagination({
    type,
    year,
  }: {
    type?: ExamType;
    year?: number;
  }): Promise<Exam[]>;

  abstract findById(id: Exam['id']): Promise<NullableType<Exam>>;

  abstract findByIds(ids: Exam['id'][]): Promise<Exam[]>;

  abstract update(
    id: Exam['id'],
    payload: DeepPartial<Exam>,
  ): Promise<Exam | null>;

  abstract remove(id: Exam['id']): Promise<void>;

  abstract findYearsExam(): Promise<number[]>;
}
