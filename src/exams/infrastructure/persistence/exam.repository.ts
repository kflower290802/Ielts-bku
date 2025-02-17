import { InfinityPaginationResponseDto } from '../../../utils/dto/infinity-pagination-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Exam } from '../../domain/exam';
import { ExamStatus, ExamType } from '../../exams.type';

export abstract class ExamRepository {
  abstract create(
    data: Omit<Exam, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Exam>;

  abstract findAllWithPagination({
    paginationOptions,
    type,
    status,
    userId,
    year,
  }: {
    paginationOptions: IPaginationOptions;
    type?: ExamType;
    status?: ExamStatus;
    userId: string;
    year?: number;
  }): Promise<InfinityPaginationResponseDto<Exam>>;

  abstract findById(id: Exam['id']): Promise<NullableType<Exam>>;

  abstract findByIds(ids: Exam['id'][]): Promise<Exam[]>;

  abstract update(
    id: Exam['id'],
    payload: DeepPartial<Exam>,
  ): Promise<Exam | null>;

  abstract remove(id: Exam['id']): Promise<void>;

  abstract findYearsExam(): Promise<number[]>;
}
