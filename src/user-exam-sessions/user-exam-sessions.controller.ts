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
import { UserExamSessionsService } from './user-exam-sessions.service';
import { CreateUserExamSessionDto } from './dto/create-user-exam-session.dto';
import { UpdateUserExamSessionDto } from './dto/update-user-exam-session.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
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

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: UserExamSession,
  })
  findById(@Param('id') id: string) {
    return this.userExamSessionsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: UserExamSession,
  })
  update(
    @Param('id') id: string,
    @Body() updateUserExamSessionDto: UpdateUserExamSessionDto,
  ) {
    return this.userExamSessionsService.update(id, updateUserExamSessionDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.userExamSessionsService.remove(id);
  }
}
