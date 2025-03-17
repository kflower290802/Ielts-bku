import { Controller, Post, Body } from '@nestjs/common';
import { ExamListenQuestionsService } from './exam-listen-questions.service';
import { CreateExamListenQuestionDto } from './dto/create-exam-listen-question.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ExamListenQuestion } from './domain/exam-listen-question';

@ApiTags('Examlistenquestions')
@Controller({
  path: 'exam-listen-questions',
  version: '1',
})
export class ExamListenQuestionsController {
  constructor(
    private readonly examListenQuestionsService: ExamListenQuestionsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: ExamListenQuestion,
  })
  create(@Body() createExamListenQuestionDto: CreateExamListenQuestionDto) {
    return this.examListenQuestionsService.create(createExamListenQuestionDto);
  }
}
