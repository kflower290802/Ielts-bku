import {
  Controller,
  // Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserExamSpeakAnswersService } from './user-exam-speak-answers.service';
import { CreateUserExamSpeakAnswerDto } from './dto/create-user-exam-speak-answer.dto';
// import { UpdateUserExamSpeakAnswerDto } from './dto/update-user-exam-speak-answer.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  // ApiOkResponse,
  // ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserExamSpeakAnswer } from './domain/user-exam-speak-answer';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Userexamspeakanswers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'user-exam-speak-answers',
  version: '1',
})
export class UserExamSpeakAnswersController {
  constructor(
    private readonly userExamSpeakAnswersService: UserExamSpeakAnswersService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: UserExamSpeakAnswer,
  })
  @UseInterceptors(FileInterceptor('answer'))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createUserExamSpeakAnswerDto: CreateUserExamSpeakAnswerDto,
    @UploadedFile()
    answer: Express.Multer.File,
  ) {
    return this.userExamSpeakAnswersService.create({
      ...createUserExamSpeakAnswerDto,
      answer,
    });
  }

  // @Get(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // @ApiOkResponse({
  //   type: UserExamSpeakAnswer,
  // })
  // findById(@Param('id') id: string) {
  //   return this.userExamSpeakAnswersService.findById(id);
  // }

  // @Patch(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // @ApiOkResponse({
  //   type: UserExamSpeakAnswer,
  // })
  // update(
  //   @Param('id') id: string,
  //   @Body() updateUserExamSpeakAnswerDto: UpdateUserExamSpeakAnswerDto,
  // ) {
  //   return this.userExamSpeakAnswersService.update(
  //     id,
  //     updateUserExamSpeakAnswerDto,
  //   );
  // }

  // @Delete(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // remove(@Param('id') id: string) {
  //   return this.userExamSpeakAnswersService.remove(id);
  // }
}
