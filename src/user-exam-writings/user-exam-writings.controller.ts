import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UserExamWritingsService } from './user-exam-writings.service';
import { CreateUserExamWritingDto } from './dto/create-user-exam-writing.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
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
}
