import { BlogSchemaClass } from '../../../../../blogs/infrastructure/persistence/document/entities/blog.schema';
import { Lesson } from '../../../../../lessons/domain/lesson';
import { FlashCard } from '../../../../domain/flash-card';
import { FlashCardSchemaClass } from '../entities/flash-card.schema';

export class FlashCardMapper {
  public static toDomain(raw: FlashCardSchemaClass): FlashCard {
    const domainEntity = new FlashCard();
    domainEntity.id = raw._id.toString();
    const lessonEntity = new Lesson();
    lessonEntity.id = raw.lesson._id;
    domainEntity.lesson = lessonEntity;
    domainEntity.cards = raw.cards;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    return domainEntity;
  }

  public static toPersistence(domainEntity: FlashCard): FlashCardSchemaClass {
    const persistenceSchema = new FlashCardSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.cards = domainEntity.cards;

    const blog = new BlogSchemaClass();
    if (domainEntity.lesson.blog) {
      blog._id = domainEntity.lesson.blog.id;
    }
    persistenceSchema.lesson = {
      ...domainEntity.lesson,
      _id: domainEntity.lesson.id,
    };
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
