import { Controller, Post, Body } from '@nestjs/common';
import { PracticeListenQuestionsService } from './practice-listen-questions.service';
import { CreatePracticeListenQuestionDto } from './dto/create-practice-listen-question.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PracticeListenQuestion } from './domain/practice-listen-question';

@ApiTags('Practicelistenquestions')
@Controller({
  path: 'practice-listen-questions',
  version: '1',
})
export class PracticeListenQuestionsController {
  constructor(
    private readonly practiceListenQuestionsService: PracticeListenQuestionsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: PracticeListenQuestion,
  })
  create(
    @Body() createPracticeListenQuestionDto: CreatePracticeListenQuestionDto,
  ) {
    return this.practiceListenQuestionsService.create(
      createPracticeListenQuestionDto,
    );
  }
}
