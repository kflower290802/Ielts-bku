import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  Request,
} from '@nestjs/common';
import { UserExamSessionsService } from './user-exam-sessions.service';
import { CreateUserExamSessionDto } from './dto/create-user-exam-session.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UserExamSession } from './domain/user-exam-session';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Userexamsessions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'user-exam-sessions',
  version: '1',
})
export class UserExamSessionsController {
  constructor(
    private readonly userExamSessionsService: UserExamSessionsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: UserExamSession,
  })
  create(@Body() createUserExamSessionDto: CreateUserExamSessionDto) {
    return this.userExamSessionsService.create(createUserExamSessionDto);
  }

  @Get('time-spent')
  @ApiOkResponse({
    type: [UserExamSession],
  })
  @ApiQuery({
    name: 'startTime',
    type: String,
    required: true,
  })
  @ApiQuery({
    name: 'endTime',
    type: String,
    required: true,
  })
  getTimeSpentByDay(
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
    @Request() request,
  ) {
    const user = request.user.id;
    return this.userExamSessionsService.getTimeSpentByDay(
      user.id,
      new Date(startTime),
      new Date(endTime),
    );
  }
}
