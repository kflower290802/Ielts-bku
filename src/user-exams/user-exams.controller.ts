import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { UserExamsService } from './user-exams.service';
import { CreateUserExamDto } from './dto/create-user-exam.dto';
import { UpdateUserExamDto } from './dto/update-user-exam.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UserExam } from './domain/user-exam';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Userexams')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'user-exams',
  version: '1',
})
export class UserExamsController {
  constructor(private readonly userExamsService: UserExamsService) {}

  @Post()
  @ApiCreatedResponse({
    type: UserExam,
  })
  create(@Body() createUserExamDto: CreateUserExamDto) {
    return this.userExamsService.create(createUserExamDto);
  }

  @Get('scores-by-period-day')
  @ApiQuery({
    name: 'startTime',
    type: Date,
    required: true,
  })
  @ApiQuery({
    name: 'endTime',
    type: Date,
    required: true,
  })
  getScoresByDay(
    @Request() request,
    @Query('startTime') startTime: Date,
    @Query('endTime') endTime: Date,
  ) {
    const userId = request.user.id;
    return this.userExamsService.getScoresByDay(
      userId,
      new Date(startTime),
      new Date(endTime),
    );
  }

  @Get('exam/:id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: UserExam,
  })
  findHistoryExam(@Request() request, @Param('id') id: string) {
    const userId = request.user.id;
    return this.userExamsService.findByUserIdAndExamId(userId, id);
  }

  @Get('avg-score')
  getAvgScore(@Request() request) {
    const userId = request.user.id;
    return this.userExamsService.getAvgScore(userId);
  }
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: UserExam,
  })
  findById(@Param('id') id: string) {
    return this.userExamsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: UserExam,
  })
  update(
    @Param('id') id: string,
    @Body() updateUserExamDto: UpdateUserExamDto,
  ) {
    return this.userExamsService.update(id, updateUserExamDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.userExamsService.remove(id);
  }
}
