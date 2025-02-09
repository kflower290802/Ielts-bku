import { ChoiceMapper } from '../../../../../choices/infrastructure/persistence/document/mappers/choice.mapper';
import { Explaination } from '../../../../domain/explaination';
import { ExplainationSchemaClass } from '../entities/explaination.schema';

export class ExplainationMapper {
  public static toDomain(raw: ExplainationSchemaClass): Explaination {
    const domainEntity = new Explaination();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.choice = ChoiceMapper.toDomain(raw.choice);
    return domainEntity;
  }

  public static toPersistence(
    domainEntity: Explaination,
  ): ExplainationSchemaClass {
    const persistenceSchema = new ExplainationSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    const choice = ChoiceMapper.toPersistence(domainEntity.choice);
    persistenceSchema.choice = choice;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
