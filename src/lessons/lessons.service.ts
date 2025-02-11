import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonRepository } from './infrastructure/persistence/lesson.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Lesson } from './domain/lesson';
import { LessonType } from './lessons.type';
import { VideosService } from '../videos/videos.service';
import { BlogsService } from '../blogs/blogs.service';
import { BlogLessonsService } from '../blog-lessons/blog-lessons.service';
import { FlashCardsService } from '../flash-cards/flash-cards.service';

@Injectable()
export class LessonsService {
  constructor(
    private readonly lessonRepository: LessonRepository,
    private readonly videosService: VideosService,
    private readonly blogsService: BlogsService,
    @Inject(forwardRef(() => BlogLessonsService))
    private readonly blogLessonService: BlogLessonsService,
    @Inject(forwardRef(() => FlashCardsService))
    private readonly flashCardService: FlashCardsService,
  ) {}

  async create(
    createLessonDto: CreateLessonDto & { video?: Express.Multer.File },
  ) {
    // Do not remove comment below.
    // <creating-property />
    const { type, blogId, cards } = createLessonDto;
    let videoId: undefined | string = '';
    if (type === LessonType.Video && createLessonDto.video) {
      const videoUrl = await this.videosService.uploadVideo(
        createLessonDto.video,
      );
      videoId = videoUrl.video;
    }
    const lesson = await this.lessonRepository.create({
      videoId,
      ...createLessonDto,
    });
    if (type === LessonType.Video) return lesson;
    if (type === LessonType.FlashCard && cards) {
      const flashcard = await this.flashCardService.create({
        cards,
        lessonId: lesson.id,
      });
      return { ...lesson, flashcard };
    }
    if (type === LessonType.Blog && blogId) {
      const blog = await this.blogsService.findById(blogId);
      if (!blog) throw new BadRequestException('Blog not found');
      await this.blogLessonService.create({
        blogId: blog.id,
        lessonId: lesson.id,
      });
      return {
        ...lesson,
        blog,
      };
    }
    return lesson;
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.lessonRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Lesson['id']) {
    return this.lessonRepository.findById(id);
  }

  findByIds(ids: Lesson['id'][]) {
    return this.lessonRepository.findByIds(ids);
  }

  async update(
    id: Lesson['id'],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updatelessonDto: UpdateLessonDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.lessonRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
    });
  }

  remove(id: Lesson['id']) {
    return this.lessonRepository.remove(id);
  }
}
