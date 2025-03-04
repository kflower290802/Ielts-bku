import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogRepository } from './infrastructure/persistence/blog.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Blog } from './domain/blog';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class BlogsService {
  constructor(
    private readonly blogRepository: BlogRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createBlogDto: CreateBlogDto & { image: Express.Multer.File }) {
    // Do not remove comment below.
    // <creating-property />
    const imageResponse = await this.cloudinaryService.uploadImage(
      createBlogDto.image,
    );
    if (imageResponse.http_code)
      throw new InternalServerErrorException('Something went wrong!');
    return this.blogRepository.create({
      ...createBlogDto,
      image: imageResponse.secure_url,
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

  async update(id: Blog['id'], updateBlogDto: UpdateBlogDto) {
    // Do not remove comment below.
    // <updating-property />

    return this.blogRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      ...updateBlogDto,
    });
  }

  remove(id: Blog['id']) {
    return this.blogRepository.remove(id);
  }
}
