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
} from '@nestjs/common';
import { UserExamWritingsService } from './user-exam-writings.service';
import { CreateUserExamWritingDto } from './dto/create-user-exam-writing.dto';
import { UpdateUserExamWritingDto } from './dto/update-user-exam-writing.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserExamWriting } from './domain/user-exam-writing';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Userexamwritings')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'user-exam-writings',
  version: '1',
})
export class UserExamWritingsController {
  constructor(
    private readonly userExamWritingsService: UserExamWritingsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: UserExamWriting,
  })
  create(
    @Body() createUserExamWritingDto: CreateUserExamWritingDto[],
    @Request() request,
  ) {
    const userId = request.user.id;
    return this.userExamWritingsService.create(
      createUserExamWritingDto,
      userId,
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: UserExamWriting,
  })
  findById(@Param('id') id: string) {
    return this.userExamWritingsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: UserExamWriting,
  })
  update(
    @Param('id') id: string,
    @Body() updateUserExamWritingDto: UpdateUserExamWritingDto,
  ) {
    return this.userExamWritingsService.update(id, updateUserExamWritingDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.userExamWritingsService.remove(id);
  }
}
