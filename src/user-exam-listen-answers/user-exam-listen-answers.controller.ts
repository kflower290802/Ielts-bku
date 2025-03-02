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
import { UserExamListenAnswersService } from './user-exam-listen-answers.service';
import { CreateUserExamListenAnswerDto } from './dto/create-user-exam-listen-answer.dto';
import { UpdateUserExamListenAnswerDto } from './dto/update-user-exam-listen-answer.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserExamListenAnswer } from './domain/user-exam-listen-answer';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Userexamlistenanswers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'user-exam-listen-answers',
  version: '1',
})
export class UserExamListenAnswersController {
  constructor(
    private readonly userExamListenAnswersService: UserExamListenAnswersService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: [UserExamListenAnswer],
  })
  @ApiBody({ type: [CreateUserExamListenAnswerDto] })
  create(
    @Body() createUserExamListenAnswerDto: CreateUserExamListenAnswerDto[],
  ) {
    return this.userExamListenAnswersService.create(
      createUserExamListenAnswerDto,
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: UserExamListenAnswer,
  })
  findById(@Param('id') id: string) {
    return this.userExamListenAnswersService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: UserExamListenAnswer,
  })
  update(
    @Param('id') id: string,
    @Body() updateUserExamListenAnswerDto: UpdateUserExamListenAnswerDto,
  ) {
    return this.userExamListenAnswersService.update(
      id,
      updateUserExamListenAnswerDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.userExamListenAnswersService.remove(id);
  }
}
