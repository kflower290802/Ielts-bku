import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ExamPassageAnswersService } from './exam-passage-answers.service';
import { UpdateExamPassageAnswerDto } from './dto/update-exam-passage-answer.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ExamPassageAnswer } from './domain/exam-passage-answer';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('ExamPassageAnswers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'exam-passage-answers',
  version: '1',
})
export class ExamPassageAnswersController {
  constructor(
    private readonly examPassageAnswersService: ExamPassageAnswersService,
  ) {}

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ExamPassageAnswer,
  })
  findById(@Param('id') id: string) {
    return this.examPassageAnswersService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ExamPassageAnswer,
  })
  update(
    @Param('id') id: string,
    @Body() updateExamPassageAnswerDto: UpdateExamPassageAnswerDto,
  ) {
    return this.examPassageAnswersService.update(
      id,
      updateExamPassageAnswerDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.examPassageAnswersService.remove(id);
  }
}
