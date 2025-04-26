import { User } from '../../../../../users/domain/user';
import { PageVisit } from '../../../../domain/page-visit';
import { PageVisitSchemaClass } from '../entities/page-visit.schema';
import { UserSchemaClass } from '../../../../../users/infrastructure/persistence/document/entities/user.schema';
export class PageVisitMapper {
  public static toDomain(raw: PageVisitSchemaClass): PageVisit {
    const domainEntity = new PageVisit();
    domainEntity.id = raw._id.toString();
    domainEntity.url = raw.url;
    if (raw.user) {
      const user = new User();
      user.id = raw.user._id.toString();
      domainEntity.user = user;
    }
    domainEntity.deviceType = raw.deviceType;
    domainEntity.browser = raw.browser;
    domainEntity.os = raw.os;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: PageVisit): PageVisitSchemaClass {
    const persistenceSchema = new PageVisitSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.url = domainEntity.url;
    if (domainEntity.user) {
      const user = new UserSchemaClass();
      user._id = domainEntity.user.id;
      persistenceSchema.user = user;
    }
    persistenceSchema.deviceType = domainEntity.deviceType;
    persistenceSchema.browser = domainEntity.browser;
    persistenceSchema.os = domainEntity.os;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
