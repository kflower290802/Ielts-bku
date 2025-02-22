import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateBlogLessonDto } from './dto/create-blog-lesson.dto';
import { UpdateBlogLessonDto } from './dto/update-blog-lesson.dto';
import { BlogLessonRepository } from './infrastructure/persistence/blog-lesson.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { BlogLesson } from './domain/blog-lesson';
import { BlogsService } from '../blogs/blogs.service';
import { LessonsService } from '../lessons/lessons.service';

@Injectable()
export class BlogLessonsService {
  constructor(
    // Dependencies here
    private readonly blogLessonRepository: BlogLessonRepository,
    private readonly blogsService: BlogsService,
    @Inject(forwardRef(() => LessonsService))
    private readonly lessonsService: LessonsService,
  ) {}

  async create(createBlogLessonDto: CreateBlogLessonDto) {
    // Do not remove comment below.
    // <creating-property />
    const { blogId, lessonId } = createBlogLessonDto;
    const blog = await this.blogsService.findById(blogId);
    if (!blog) throw new BadRequestException('Blog not found!');

    const lesson = await this.lessonsService.findById(lessonId);

    if (!lesson) throw new BadRequestException('Lesson not found!');
    return this.blogLessonRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      blog,
      lesson,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.blogLessonRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: BlogLesson['id']) {
    return this.blogLessonRepository.findById(id);
  }

  findByIds(ids: BlogLesson['id'][]) {
    return this.blogLessonRepository.findByIds(ids);
  }

  async update(
    id: BlogLesson['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateBlogLessonDto: UpdateBlogLessonDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.blogLessonRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: BlogLesson['id']) {
    return this.blogLessonRepository.remove(id);
  }
}
