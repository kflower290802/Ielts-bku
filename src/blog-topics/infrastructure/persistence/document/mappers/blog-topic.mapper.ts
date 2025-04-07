import { BlogTopic } from '../../../../domain/blog-topic';
import { BlogTopicSchemaClass } from '../entities/blog-topic.schema';
import { Topic } from '../../../../../topics/domain/topic';
import { Blog } from '../../../../../blogs/domain/blog';
import { TopicSchemaClass } from '../../../../../topics/infrastructure/persistence/document/entities/topic.schema';
import { BlogSchemaClass } from '../../../../../blogs/infrastructure/persistence/document/entities/blog.schema';

export class BlogTopicMapper {
  public static toDomain(raw: BlogTopicSchemaClass): BlogTopic {
    const domainEntity = new BlogTopic();
    domainEntity.id = raw._id.toString();
    const topic = new Topic();
    topic.id = raw.topic._id.toString();
    domainEntity.topic = topic;
    const blog = new Blog();
    blog.id = raw.blog._id.toString();
    domainEntity.blog = blog;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: BlogTopic): BlogTopicSchemaClass {
    const persistenceSchema = new BlogTopicSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    const topic = new TopicSchemaClass();
    topic._id = domainEntity.topic.id;
    persistenceSchema.topic = topic;
    const blog = new BlogSchemaClass();
    blog._id = domainEntity.blog.id;
    persistenceSchema.blog = blog;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
