import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { Topic } from '../../domain/topic';

export abstract class TopicRepository {
  abstract create(
    data: Omit<Topic, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Topic>;

  abstract findById(id: Topic['id']): Promise<NullableType<Topic>>;

  abstract findByIds(ids: Topic['id'][]): Promise<Topic[]>;

  abstract update(
    id: Topic['id'],
    payload: DeepPartial<Topic>,
  ): Promise<Topic | null>;

  abstract remove(id: Topic['id']): Promise<void>;

  abstract findAllTopics(): Promise<Topic[]>;
}
