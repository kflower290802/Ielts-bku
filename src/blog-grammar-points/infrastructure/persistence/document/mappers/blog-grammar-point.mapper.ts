import { BlogGrammarPoint } from '../../../../domain/blog-grammar-point';
import { BlogGrammarPointSchemaClass } from '../entities/blog-grammar-point.schema';
import { Blog } from '../../../../../blogs/domain/blog';
import { GrammarPoint } from '../../../../../grammar-points/domain/grammar-point';
import { BlogSchemaClass } from '../../../../../blogs/infrastructure/persistence/document/entities/blog.schema';
import { GrammarPointSchemaClass } from '../../../../../grammar-points/infrastructure/persistence/document/entities/grammar-point.schema';
export class BlogGrammarPointMapper {
  public static toDomain(raw: BlogGrammarPointSchemaClass): BlogGrammarPoint {
    const domainEntity = new BlogGrammarPoint();
    domainEntity.id = raw._id.toString();
    const blog = new Blog();
    blog.id = raw.blog._id.toString();
    domainEntity.blog = blog;
    const grammarPoint = new GrammarPoint();
    grammarPoint.id = raw.grammarPoint._id.toString();
    domainEntity.grammarPoint = grammarPoint;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(
    domainEntity: BlogGrammarPoint,
  ): BlogGrammarPointSchemaClass {
    const persistenceSchema = new BlogGrammarPointSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    const blog = new BlogSchemaClass();
    blog._id = domainEntity.blog.id;
    persistenceSchema.blog = blog;
    const grammarPoint = new GrammarPointSchemaClass();
    grammarPoint._id = domainEntity.grammarPoint.id;
    persistenceSchema.grammarPoint = grammarPoint;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
