import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserPracticeWritingAnswersService } from './user-practice-writing-answers.service';
import { CreateUserPracticeWritingAnswerDto } from './dto/create-user-practice-writing-answer.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserPracticeWritingAnswer } from './domain/user-practice-writing-answer';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Userpracticewritinganswers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'user-practice-writing-answers',
  version: '1',
})
export class UserPracticeWritingAnswersController {
  constructor(
    private readonly userPracticeWritingAnswersService: UserPracticeWritingAnswersService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: UserPracticeWritingAnswer,
  })
  create(
    @Body()
    createUserPracticeWritingAnswerDto: CreateUserPracticeWritingAnswerDto,
  ) {
    return this.userPracticeWritingAnswersService.create(
      createUserPracticeWritingAnswerDto,
    );
  }
}
