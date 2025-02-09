import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogRepository } from './infrastructure/persistence/blog.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Blog } from './domain/blog';

@Injectable()
export class BlogsService {
  constructor(
    // Dependencies here
    private readonly blogRepository: BlogRepository,
  ) {}

  async create(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createBlogDto: CreateBlogDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.blogRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.blogRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Blog['id']) {
    return this.blogRepository.findById(id);
  }

  findByIds(ids: Blog['id'][]) {
    return this.blogRepository.findByIds(ids);
  }

  async update(
    id: Blog['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateBlogDto: UpdateBlogDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.blogRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Blog['id']) {
    return this.blogRepository.remove(id);
  }
}
