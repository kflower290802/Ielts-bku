import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { questionsService } from './questions.service';
import { CreatequestionDto } from './dto/create-question.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { question } from './domain/question';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('Questions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'questions',
  version: '1',
})
export class questionsController {
  constructor(private readonly questionsService: questionsService) {}

  @Post()
  @ApiCreatedResponse({
    type: question,
  })
  create(@Body() createquestionDto: CreatequestionDto) {
    return this.questionsService.create(createquestionDto);
  }
}
