import { Controller, Post, Body } from '@nestjs/common';
import { ExamPassageQuestionsService } from './exam-passage-questions.service';
import { CreateExamPassageQuestionDto } from './dto/create-exam-passage-question.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ExamPassageQuestion } from './domain/exam-passage-question';

@ApiTags('Exampassagequestions')
@ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'exam-passage-questions',
  version: '1',
})
export class ExamPassageQuestionsController {
  constructor(
    private readonly examPassageQuestionsService: ExamPassageQuestionsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: ExamPassageQuestion,
  })
  @ApiBody({ type: CreateExamPassageQuestionDto })
  create(@Body() createExamPassageQuestionDto: CreateExamPassageQuestionDto) {
    return this.examPassageQuestionsService.create(
      createExamPassageQuestionDto,
    );
  }
}
