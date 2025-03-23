import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PracticeListenAnswersService } from './practice-listen-answers.service';
import { CreatePracticeListenAnswerDto } from './dto/create-practice-listen-answer.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PracticeListenAnswer } from './domain/practice-listen-answer';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Practicelistenanswers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'practice-listen-answers',
  version: '1',
})
export class PracticeListenAnswersController {
  constructor(
    private readonly practiceListenAnswersService: PracticeListenAnswersService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: PracticeListenAnswer,
  })
  create(@Body() createPracticeListenAnswerDto: CreatePracticeListenAnswerDto) {
    return this.practiceListenAnswersService.create(
      createPracticeListenAnswerDto,
    );
  }
}
