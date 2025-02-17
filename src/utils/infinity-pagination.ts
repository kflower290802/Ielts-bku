import { IPaginationResponse } from './types/pagination-options';
import { InfinityPaginationResponseDto } from './dto/infinity-pagination-response.dto';

export const infinityPagination = <T>(
  data: T[],
  options: IPaginationResponse,
): InfinityPaginationResponseDto<T> => {
  const { limit, page, total } = options;
  return {
    data,
    limit,
    page: page || 1,
    pages: Math.ceil(total / options.limit),
    total,
  };
};
