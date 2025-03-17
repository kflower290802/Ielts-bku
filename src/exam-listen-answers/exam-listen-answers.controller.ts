import { Controller, Post, Body } from '@nestjs/common';
import { ExamListenAnswersService } from './exam-listen-answers.service';
import { CreateExamListenAnswerDto } from './dto/create-exam-listen-answer.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ExamListenAnswer } from './domain/exam-listen-answer';

@ApiTags('Examlistenanswers')
@Controller({
  path: 'exam-listen-answers',
  version: '1',
})
export class ExamListenAnswersController {
  constructor(
    private readonly examListenAnswersService: ExamListenAnswersService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: ExamListenAnswer,
  })
  create(@Body() createExamListenAnswerDto: CreateExamListenAnswerDto) {
    return this.examListenAnswersService.create(createExamListenAnswerDto);
  }
}
