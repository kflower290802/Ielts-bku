import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserPracticeListenAnswersService } from './user-practice-listen-answers.service';
import { CreateUserPracticeListenAnswerDto } from './dto/create-user-practice-listen-answer.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserPracticeListenAnswer } from './domain/user-practice-listen-answer';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Userpracticelistenanswers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'user-practice-listen-answers',
  version: '1',
})
export class UserPracticeListenAnswersController {
  constructor(
    private readonly userPracticeListenAnswersService: UserPracticeListenAnswersService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: UserPracticeListenAnswer,
  })
  create(
    @Body()
    createUserPracticeListenAnswerDto: CreateUserPracticeListenAnswerDto,
  ) {
    return this.userPracticeListenAnswersService.create(
      createUserPracticeListenAnswerDto,
    );
  }
}
