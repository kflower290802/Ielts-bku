import { Blog } from '../../../../domain/blog';
import { BlogSchemaClass } from '../entities/blog.schema';

export class BlogMapper {
  public static toDomain(raw: BlogSchemaClass): Blog {
    const domainEntity = new Blog();
    domainEntity.id = raw._id.toString();
    domainEntity.content = raw.content;
    domainEntity.image = raw.image;
    domainEntity.title = raw.title;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: Blog): BlogSchemaClass {
    const persistenceSchema = new BlogSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.content = domainEntity.content;
    persistenceSchema.image = domainEntity.image;
    persistenceSchema.title = domainEntity.title;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
