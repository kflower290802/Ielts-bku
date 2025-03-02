import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ExamListenQuestionsService } from './exam-listen-questions.service';
import { CreateExamListenQuestionDto } from './dto/create-exam-listen-question.dto';
import { UpdateExamListenQuestionDto } from './dto/update-exam-listen-question.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ExamListenQuestion } from './domain/exam-listen-question';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Examlistenquestions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
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

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ExamListenQuestion,
  })
  findById(@Param('id') id: string) {
    return this.examListenQuestionsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ExamListenQuestion,
  })
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
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.examListenQuestionsService.remove(id);
  }
}
