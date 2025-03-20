import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { TopicRepository } from './infrastructure/persistence/topic.repository';
import { Topic } from './domain/topic';

@Injectable()
export class TopicsService {
  constructor(private readonly topicRepository: TopicRepository) {}

  async create(createTopicDto: CreateTopicDto) {
    return this.topicRepository.create(createTopicDto);
  }

  findById(id: Topic['id']) {
    return this.topicRepository.findById(id);
  }

  findByIds(ids: Topic['id'][]) {
    return this.topicRepository.findByIds(ids);
  }

  remove(id: Topic['id']) {
    return this.topicRepository.remove(id);
  }

  findAllTopics() {
    return this.topicRepository.findAllTopics();
  }
}
