import { Controller, Post, Body } from '@nestjs/common';
import { PracticeReadingQuestionsService } from './practice-reading-questions.service';
import { CreatePracticeReadingQuestionDto } from './dto/create-practice-reading-question.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PracticeReadingQuestion } from './domain/practice-reading-question';

@ApiTags('Practicereadingquestions')
@Controller({
  path: 'practice-reading-questions',
  version: '1',
})
export class PracticeReadingQuestionsController {
  constructor(
    private readonly practiceReadingQuestionsService: PracticeReadingQuestionsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: PracticeReadingQuestion,
  })
  create(
    @Body() createPracticeReadingQuestionDto: CreatePracticeReadingQuestionDto,
  ) {
    return this.practiceReadingQuestionsService.create(
      createPracticeReadingQuestionDto,
    );
  }
}
