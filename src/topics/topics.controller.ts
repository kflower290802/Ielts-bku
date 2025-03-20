import { Controller, Get, Post, Body } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Topic } from './domain/topic';

@ApiTags('Topics')
@Controller({
  path: 'topics',
  version: '1',
})
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Topic,
  })
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicsService.create(createTopicDto);
  }

  @Get()
  @ApiOkResponse({
    type: [Topic],
  })
  async findAll(): Promise<Topic[]> {
    return this.topicsService.findAllTopics();
  }
}
