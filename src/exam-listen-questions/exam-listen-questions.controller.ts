import { Controller, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ExamListenQuestionsService } from './exam-listen-questions.service';
import { CreateExamListenQuestionDto } from './dto/create-exam-listen-question.dto';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ExamListenQuestion } from './domain/exam-listen-question';
import { UpdateExamListenQuestionDto } from './dto/update-exam-listen-question.dto';

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

  @Patch(':id')
  @ApiCreatedResponse({
    type: ExamListenQuestion,
  })
  @ApiBody({ type: UpdateExamListenQuestionDto })
  update(
    @Param('id') id: string,
    @Body() updateExamListenQuestionDto: UpdateExamListenQuestionDto,
  ) {
    return this.examListenQuestionsService.update(
      id,
      updateExamListenQuestionDto,
    );
  }

  @Delete(':id')
  @ApiCreatedResponse({
    type: ExamListenQuestion,
  })
  remove(@Param('id') id: string) {
    return this.examListenQuestionsService.remove(id);
  }
}
