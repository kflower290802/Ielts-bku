import { Blog } from '../../../../domain/blog';
import { BlogSchemaClass } from '../entities/blog.schema';

export class BlogMapper {
  public static toDomain(raw: BlogSchemaClass): Blog {
    const domainEntity = new Blog();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: Blog): BlogSchemaClass {
    const persistenceSchema = new BlogSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
