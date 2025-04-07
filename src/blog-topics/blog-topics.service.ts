import { Injectable } from '@nestjs/common';
import { CreateBlogTopicDto } from './dto/create-blog-topic.dto';
import { BlogTopicRepository } from './infrastructure/persistence/blog-topic.repository';
import { Topic } from '../topics/domain/topic';
import { Blog } from '../blogs/domain/blog';

@Injectable()
export class BlogTopicsService {
  constructor(private readonly blogTopicRepository: BlogTopicRepository) {}

  async create(createBlogTopicDto: CreateBlogTopicDto) {
    const { topicId, blogId } = createBlogTopicDto;
    const topic = new Topic();
    topic.id = topicId;
    const blog = new Blog();
    blog.id = blogId;
    return this.blogTopicRepository.create({
      topic,
      blog,
    });
  }

  findAllByTopicIdWithPagination(
    page: number = 1,
    limit: number = 10,
    topicId?: string,
  ) {
    return this.blogTopicRepository.findAllByTopicIdWithPagination(
      page,
      limit,
      topicId,
    );
  }
}
