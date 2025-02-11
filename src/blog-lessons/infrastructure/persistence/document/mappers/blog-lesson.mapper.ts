import { Blog } from '../../../../../blogs/domain/blog';
import { Lesson } from '../../../../../lessons/domain/lesson';
import { BlogLesson } from '../../../../domain/blog-lesson';
import { BlogLessonSchemaClass } from '../entities/blog-lesson.schema';

export class BlogLessonMapper {
  public static toDomain(raw: BlogLessonSchemaClass): BlogLesson {
    const domainEntity = new BlogLesson();
    domainEntity.id = raw._id.toString();
    const blog = new Blog();
    blog.id = raw.blog._id;
    domainEntity.blog = blog;
    const lesson = new Lesson();
    lesson.id = raw.lesson._id;
    domainEntity.lesson = lesson;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: BlogLesson): BlogLessonSchemaClass {
    const persistenceSchema = new BlogLessonSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.blog = {
      ...domainEntity.blog,
      _id: domainEntity.blog.id,
    };
    persistenceSchema.lesson = {
      ...domainEntity.lesson,
      _id: domainEntity.lesson.id,
    };
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
