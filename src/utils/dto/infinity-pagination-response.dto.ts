import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class InfinityPaginationResponseDto<T> {
  data: T[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}

export function InfinityPaginationResponse<T>(classReference: Type<T>) {
  abstract class Pagination {
    @ApiProperty({ type: [classReference] })
    data!: T[];

    @ApiProperty({
      type: Number,
      example: 10,
    })
    pages: number;

    @ApiProperty({
      type: Number,
      example: 1,
    })
    page: number;

    @ApiProperty({
      type: Number,
      example: 10,
    })
    limit: number;

    @ApiProperty({
      type: Number,
      example: 10,
    })
    total: number;
  }

  Object.defineProperty(Pagination, 'name', {
    writable: false,
    value: `InfinityPagination${classReference.name}ResponseDto`,
  });

  return Pagination;
}
