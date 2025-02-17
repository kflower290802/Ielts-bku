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
import { UserExamAnswersService } from './user-exam-answers.service';
import { CreateUserExamAnswerDto } from './dto/create-user-exam-answer.dto';
import { UpdateUserExamAnswerDto } from './dto/update-user-exam-answer.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserExamAnswer } from './domain/user-exam-answer';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Userexamanswers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'user-exam-answers',
  version: '1',
})
export class UserExamAnswersController {
  constructor(
    private readonly userExamAnswersService: UserExamAnswersService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: UserExamAnswer,
  })
  create(@Body() createUserExamAnswerDto: CreateUserExamAnswerDto) {
    return this.userExamAnswersService.create(createUserExamAnswerDto);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: UserExamAnswer,
  })
  findById(@Param('id') id: string) {
    return this.userExamAnswersService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: UserExamAnswer,
  })
  update(
    @Param('id') id: string,
    @Body() updateUserExamAnswerDto: UpdateUserExamAnswerDto,
  ) {
    return this.userExamAnswersService.update(id, updateUserExamAnswerDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.userExamAnswersService.remove(id);
  }
}
