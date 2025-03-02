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
import { ExamListenAnswersService } from './exam-listen-answers.service';
import { CreateExamListenAnswerDto } from './dto/create-exam-listen-answer.dto';
import { UpdateExamListenAnswerDto } from './dto/update-exam-listen-answer.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ExamListenAnswer } from './domain/exam-listen-answer';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Examlistenanswers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
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

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ExamListenAnswer,
  })
  findById(@Param('id') id: string) {
    return this.examListenAnswersService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ExamListenAnswer,
  })
  update(
    @Param('id') id: string,
    @Body() updateExamListenAnswerDto: UpdateExamListenAnswerDto,
  ) {
    return this.examListenAnswersService.update(id, updateExamListenAnswerDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.examListenAnswersService.remove(id);
  }
}
